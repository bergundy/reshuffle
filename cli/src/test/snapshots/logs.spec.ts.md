# Snapshot report for `src/test/logs.spec.ts`

The actual snapshot is saved in `logs.spec.ts.snap`.

Generated by [AVA](https://ava.li).

## logs

> Snapshot 1

    {
      err: '',
      exitCode: 0,
      out: `main engine fire␊
      liftoff␊
      Amalthea flyby␊
      Jupiter closest approach␊
      `,
    }

## logs limit

> Snapshot 1

    {
      err: '',
      exitCode: 0,
      out: `main engine fire␊
      liftoff␊
      Amalthea flyby␊
      `,
    }

## logs paginate

> Snapshot 1

    {
      err: '',
      exitCode: 0,
      out: `main engine fire␊
      liftoff␊
      Amalthea flyby␊
      Jupiter closest approach␊
      `,
    }

## logs since absolute time

> Snapshot 1

    {
      err: '',
      exitCode: 0,
      out: `Amalthea flyby␊
      Jupiter closest approach␊
      `,
    }

## logs help

> Snapshot 1

    {
      err: '',
      exitCode: 0,
      out: `show logs␊
      ␊
      USAGE␊
        $ reshuffle logs␊
      ␊
      OPTIONS␊
        -f, --follow       Follow log output like "tail -f".␊
        -h, --help         show CLI help␊
      ␊
        -l, --limit=limit  [default: 500] Limit number of entries shown (cannot exceed␊
                           1000).␊
      ␊
        -s, --since=since  [default: 1m] Output logs since the given ISO 8601␊
                           timestamp or time period.␊
      ␊
        --config=config␊
      ␊
      EXAMPLES␊
        // retrieve all logs␊
        $ reshuffle logs␊
      ␊
        // tail all logs␊
        $ reshuffle logs --follow␊
      ␊
        // ISO␊
        $ reshuffle logs --since 2018-03-09T22:12:21.861Z␊
      ␊
        // offset format␊
        $ reshuffle logs --since 3d␊
        $ reshuffle logs --since 13hours␊
        $ reshuffle logs --since 9s␊
      ␊
        // show all logs from 2 minutes ago and follow in real time␊
        $ reshuffle logs --since 2m --follow␊
      ␊
      `,
    }