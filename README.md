#pifm-browser-zikcenter

A Node.js software to play musics from [zikcenter](https://github.com/cedced19/zikcenter) on a __FM radio__.  
Only on Raspberry Pi.
If you want to start your radio easily use [start-pifm](https://github.com/cedced19/start-pifm).

This project use a fork of [ChristopheJacquet/PiFmRds](https://github.com/ChristopheJacquet/PiFmRds).

[![Build Status](https://travis-ci.org/cedced19/pifm-browser-zikcenter.svg)](https://travis-ci.org/cedced19/pifm-browser-zikcenter)

![](https://raw.githubusercontent.com/cedced19/pifm-browser-zikcenter/master/demo.png)

##What say laws ?

You do not have the right to broadcast radio in most countries.
I am __not__ at all responsible for your actions.

##Installation

```bash
git clone --depth=1 --branch=master https://github.com/cedced19/pifm-browser-zikcenter
cd ./pifm-browser-zikcenter
make -C ./pifm && chmod 777 pifm/pifm
cp pifm/pifm dist/pifm
cd ./dist
npm install --production
apt-get install sox
apt-get install libsox-fmt-mp3
node pifm-browser.js
```

You can place your musics anywhere in the folder.

Delete all `.o`, if you have to recompile:
```
make clean -C ./pifm
```

If you had problems during the compilation mabe install `lubsndfile1-dev`:
```
apt-get install libsndfile1-dev
```
##Configuration

You can change the frequency, the url, the api path, the version of the raspberry pi, the port on `config.json`

See default options:

```json
{
    "version": 2,
    "port": 7775,
    "freq": 108.5,
    "url": "http://",
    "api": "/api"
}
```

## Why not use file?

The main advantage is if you have a zikcenter, you don't have to convert and save files in two folders.
There is few loss of quality!
If you are not convinced you can use [pifm-browser](https://github.com/cedced19/pifm-browser), an other software from me.
