# timingsrc

**A library to synchronize a MediaElement with a TimingObject.**

[![version](https://img.shields.io/npm/v/timingsrc.svg?style=flat-square)](https://www.npmjs.com/package/timingsrc)

This libary is meant to synchronize a [`MediaElement`](https://html.spec.whatwg.org/multipage/media.html#htmlmediaelement) (aka an `<audio/>` or `<video/>` element) with a [`TimingObject`](https://webtiming.github.io/timingobject/#dfn-timing-object).

The [Timing Object specification](https://webtiming.github.io/timingobject/) defines an extension of the `MediaElement` which would add a [`timingsrc`](https://webtiming.github.io/timingobject/#dom-htmlmediaelement-timingsrc) property. But so far this is not supported in any browser. Therefore this package can be used as a replacement as it provides the same functionality. But instead of patching the native protoypes this libary provides a function which can be used without modifying any built-in browser objects.

The code of this library is heavily inspired by the [`mediaSync()`](https://github.com/webtiming/timingsrc/blob/master/v1/mediasync/mediasync.js#L89) function that came with v1 of the [timingsrc](https://github.com/webtiming/timingsrc) library. However all the code has been completely rewritten in TypeScript with the goal to make it more testable and easier to reason about.

The actual synchronization is handled by two different algorithms. By default the `userAgent` string gets parsed to determine which algorithm to use. Since Safari is not capable of processing changes of the `currentTime` or the `plackbackRate` of a `MediaElement` in a timely manner the position in Safari is set abbruptly whenever it changes. Firefox and Chromium based browsers happily handle frequent changes of both properties which is why they are adjusted gradually to keep a `MediaElement` in sync with a `TimingObject` in these browsers. The technique for doing so has been taken from [Tom Jenkinon](https://github.com/tjenkinson)'s [media-element-syncer](https://github.com/tjenkinson/media-element-syncer).

## Usage

The `timingsrc` package is published on [npm](https://www.npmjs.com/package/timingsrc) and can be installed as usual.

```shell
npm install timingsrc
```

The main function exported by this package is the `setTimingsrc()` function. It can be thought of as the replacement of the `timingsrc` property on a `MediaElement`. It can for example be used with a `TimingObject` created with the [`timing-object`](https://github.com/chrisguttandin/timing-object) package.

```js
import { TimingObject } from 'timing-object';
import { setTimingsrc } from 'timingsrc';

const mediaElement = document.getElementsByTagName('video')[0];
const timingObject = new TimingObject();

const deleteTimingsrc = setTimingsrc(mediaElement, timingObject);

// The synchronization can be stopped again at any point in time.
deleteTimingsrc();
```

`setTimingsrc()` takes a third parameter which can be used to provide a function to modify the vector before it gets applied. It can for example be used to add a fixed offset.

```js
setTimingsrc(mediaElement, timingObject, ({ position, ...vector }) => ({ ...vector, position: position + 5 }));
```

It can also be used to set a loop. But in this case it's important to also provide a second function which modifies the vector before it is used to update the media element.

```js
setTimingsrc(
    mediaElement,
    timingObject,
    ({ position, ...vector }) => ({ ...vector, position: position % 5 }),
    ({ position, ...vector }) => ({ ...vector, position: position % 5 })
);
```

It is also possible to configure a custom version of the `setTimingsrc()` function. The following would build a `setTimingSrc()` function which does not include the fallback for stepwise updates which is necessary in Safari.

```js
import { createSetTimingsrc, createUpdateGradually, setTimingsrcWithCustomUpdateFunction } from 'timingsrc';

const customSetTimingsrc = createSetTimingsrc(setTimingsrcWithCustomUpdateFunction, createUpdateGradually(0.5, 1, 0.025));
```

Please take a look at the [video-synchronization-demo](https://github.com/chrisguttandin/video-synchronization-demo) for a more comprehensive example.
