import anyTest, { TestInterface } from 'ava';
import * as td from 'testdouble';
import { Context, addFake } from './fake_lycan';
import { createApp } from './utils';
import { success } from 'specshell';
import { UnauthorizedError, NotFoundError } from '@binaris/spice-koa-server/interfaces';

const test = anyTest as TestInterface<Context>;

addFake(test);

const app = createApp({});

const anything = td.matchers.anything();

test.beforeEach(async (t) => {
  t.assert(success(await t.context.shell.run(`cd ${t.context.projectDir}`)));
  t.log(t.context.projectDir);
});

test('lockApp locks an unlocked application by given app name and lock reason', async (t) => {
  td.when(t.context.lycanFake.getAppByName(anything, app.name)).thenResolve(app);
  const result = await t.context.shell.run(`${t.context.run} lock --reason lock-my-app ${app.name}`, 'utf-8');
  t.snapshot(result);
  td.verify(t.context.lycanFake.lockApp(anything, app.id, 'lock-my-app'));
});

test('lockApp locks an unlocked application by current directory with given lock reason', async (t) => {
  const projectApp = createApp({ id: 'fluffy-samaritan' });
  td.when(t.context.lycanFake.getApp(anything, projectApp.id)).thenResolve(projectApp);
  const result = await t.context.shell.run(`${t.context.run} lock -r lock-my-app`, 'utf-8');
  t.snapshot(result);
  td.verify(t.context.lycanFake.lockApp(anything, projectApp.id, 'lock-my-app'));
});

test('lock command fails when app name not in local project dir', async (t) => {
  const result = await t.context.shell.run(`cd .. && ${t.context.run} lock --reason lock-reason`, 'utf-8');
  // This snapshot will always break on another machine beacuse every machine has it's own path
  // The first value in result.err contains the global error message (splited by :)
  const relevantError = result.err.split(':').slice(0, 2).join(':');
  t.snapshot({ ...result, err: relevantError });
});

test('lock command throws NotFoundError when given app name not found', async (t) => {
  td.when(t.context.lycanFake.getAppByName(anything, 'fluffy-test')).thenReject(new NotFoundError('not found'));
  const result = await t.context.shell.run(`cd .. && ${t.context.run} lock --reason lock-me fluffy-test`, 'utf-8');
  t.snapshot(result);
});

test('lock command throws UnauthorizedError if no permission', async (t) => {
  td.when(t.context.lycanFake.lockApp(anything, 'fluffy-samaritan', 'no-permission'))
    .thenReject(new UnauthorizedError('no auth'));
  const result = await t.context.shell.run(`${t.context.run} lock --reason no-permission`, 'utf-8');
  t.snapshot(result);
});

test('lock command fails when too many args specified', async (t) => {
  const result = await t.context.shell.run(`${t.context.run} lock --reason arg extra-arg extra-extra-arg`, 'utf-8');
  t.snapshot(result);
});
