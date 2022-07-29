const GPIO = require('onoff').Gpio,
	fan = new GPIO(26, 'low'),
	winston = require('winston'),
	date = require('date-utils'),
	cproc = require('child_process');

const logger = winston.createLogger({
    transports:[
        new (winston.transports.Console)({
        timestamp:function(){return new Date().toFormat('YYYY-MM-DD HH24:MI:SS')}
        })
    ]
});

function logger_format(level, ...contents){
	const form_log = { timestamp: new Date().toFormat('YYYY-MM-DD HH24:MI:SS'), contents}
	logger[level](form_log);
}

function i(...contents) {
    //logger.info(log, contents);
	logger_format('info', contents);
}

function e(...contents) {
    //logger.error(log, contents);
	logger_format('error', contents);
}

function exe_shell(command) {
	return new Promise(function(resolve, reject) {
		cproc.exec(command, function(error, stdOut, stdErr) {
			if(error) {
				reject();
				return;
			}

			if(stdErr) {
				reject(stdErr);
				return;
			}

			resolve(stdOut);
		});
	});
}

async function get_temp() {
	setTimeout(get_temp, 10000);

	try {
		const temp = await exe_shell("cat /sys/class/thermal/thermal_zone0/temp");

		if(temp/1000 > 55){
			fan.writeSync(1);
		}
		else{
			fan.writeSync(0);
		}
		i("cpu temperture", temp/1000, fan.readSync());

	}catch(error) {
		e(error.toString());
	}

}

get_temp();
