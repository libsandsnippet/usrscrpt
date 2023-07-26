(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.tm_hotkeys = factory()
}(this, (function () {

    let tm_hotkeys = {}

    tm_hotkeys.title = 'TM Hotkeys'
    tm_hotkeys.version = 'v 1.0'

    //console.info(`${tm_hotkeys.title} (${tm_hotkeys.version}) > Loaded`)

    return (keys = []) => {

        tm_hotkeys.keys = keys && keys.length > 0 ? keys : [
            {
                title: 'Clear',
                key: 0,
                keycode: [],
                callback: (hotkey, event) => {
                    console.log('------------------------------------')
                    console.log(`${tm_hotkeys.title} (${tm_hotkeys.version}) > KEY '${event.key}' PRESSED (code: ${event.keyCode} > ${event.code}): ${hotkey.title}`)
                    console.log('------------------------------------')
                }
            }
        ]

        tm_hotkeys.handler = (e) => {

            if(tm_hotkeys.keys && tm_hotkeys.keys.length > 0) {

                //let hotkeyFound = false
                //let exclude = ['Alt','Ctrl','Tab','CapsLock','Shift','Enter','Space','Meta','ArrowUp','ArrowDown']
                
                tm_hotkeys.keys.forEach((item) => {

                    if(e.ctrlKey && e.altKey && item.key.toString().toLowerCase() == e.key.toString().toLowerCase()) {
                    //if(item.keycode.includes(e.keyCode)) {

                        item.callback(item, e)

                        //hotkeyFound = true
                    }
                })

                /*
                if(!exclude.includes(e.key) && !hotkeyFound) {

                    delete e.view
                    delete e.path
                    delete e.srcElement
                    delete e.sourceCapabilities
                    delete e.target

                    console.warn(`HANDLER > UNKNOW KEY PRESSED > ${e.key} (${e.keyCode}) > ${e.code}`, e)
                }
                */
                
            } else {

                console.warn(`HANDLER > NO HOTKEYS > PRESSED > ${e.key} (${e.keyCode}) > ${e.code}`, e)
            }
        }

        tm_hotkeys.info = (callback = null) => {

            if(tm_hotkeys.keys && tm_hotkeys.keys.length > 0) {

                let text = 'HOTKEY\'s LIST: \n\n'

                tm_hotkeys.keys.forEach((item) => {
                    text += '\t' + `KEY '${item.key}' > ${item.title}` + '\n'//, JSON.stringify(item.callback) + '\n'
                })

                console.info(text + '\n')

            } else {

                console.log('INFO > NO HOTKEYS')
            }

            if(callback) {
                callback()
            }
        }

        tm_hotkeys.init = () => {

            console.info(`${tm_hotkeys.title} (${tm_hotkeys.version}) > Initialized with ${tm_hotkeys.keys.length} hotkeys`)

            document.addEventListener('keyup', tm_hotkeys.handler, false)

            return tm_hotkeys
        }

        return tm_hotkeys.init()
    }
})));
