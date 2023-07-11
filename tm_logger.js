(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.tm_logger = factory()
}(this, (function () {

    let tm_logger = {}

    tm_logger.title = 'TM Logger'
    tm_logger.version = 'v 1.0'
    
    console.info(`${tm_logger.title} (${tm_logger.version}) > Loaded`)

    return (title_app = 'TMLGR') => {

        tm_logger.title_app = title_app

        tm_logger.now = () => { 

            const date = new Date();

            let currentHour= String(date.getHours()).padStart(2, '0');
            let currentMinute= String(date.getMinutes()).padStart(2, '0');
            let currentSecond= String(date.getSeconds()).padStart(2, '0');
            let currentMs= String(date.getMilliseconds()).padStart(3, '0');
            /*
            let currentDay= String(date.getDate()).padStart(2, '0');
            let currentMonth = String(date.getMonth()+1).padStart(2,"0");
            let currentYear = date.getFullYear();
            */

            return `${currentHour}:${currentMinute}:${currentSecond}.${currentMs}`;
        }

        tm_logger._log = (type, text, ...args) => {

            if(typeof text == 'string') {

                text = ' - ' + text

            } else {

                args = [text].concat(args)

                text = ''
            }

            text = `${tm_logger.now()} - ${tm_logger.title_app}${text}: `

            if(type == 'error')
                console.error(text, ...args)
            else if(type == 'warn')
                console.warn(text, ...args)
            else if(type == 'info')
                console.info(text, ...args)
            else
                console.log(text, ...args)
        }

        tm_logger.logger = {

            log:        function(text, ...args)     { tm_logger._log('log', text, ...args) },
            info:       function(text, ...args)     { tm_logger._log('info', text, ...args) },
            warn:       function(text, ...args)     { tm_logger._log('warn', text, ...args) },
            error:      function(text, ...args)     { tm_logger._log('error', text, ...args) },
            tm_logger:  function() { return tm_logger },
        }

        console.info(`${tm_logger.title} (${tm_logger.version}) > Initialized`)

        return tm_logger.logger
    }
})));