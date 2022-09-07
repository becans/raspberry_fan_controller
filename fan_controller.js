const GPIO = require('onoff').Gpio,
	fan = new GPIO(26, 'low'),
	winston = require('winston'),
	date = require('date-utils'),
	cproc = require('child_process'),
	fs = require('fs');

require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/fan_controller.%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d'
  });

const logger = winston.createLogger({
    transports:[
		//transport
		new (winston.transports.Console)()
    ]
});

const config_file = __dirname + '/conf/fan.config'

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

var cri_temp_cels = 0;
var running_sec = 0;
var interval_sec = 0;

function read_config(event) {
	i('read config file!!');
	var JSON_config = fs.readFileSync(config_file, 'utf8');

	var config = JSON.parse(JSON_config);

	cri_temp_cels = parseInt(config.cri_temp_cels);
	running_sec = parseInt(config.running_sec);
	interval_sec = parseInt(config.interval_sec);

	i('cri_temp_cels', cri_temp_cels);
	i('running_sec', running_sec);
	i('interval_sec', interval_sec);
}

async function get_temp() {

	var interval = interval_sec;
	try {
		const temp = await exe_shell("cat /sys/class/thermal/thermal_zone0/temp");

		if(temp/1000 > cri_temp_cels){
			fan.writeSync(1);
			interval = running_sec;
		}
		else{
			fan.writeSync(0);
		}
		i("cpu temperture", temp/1000, fan.readSync());

	}catch(error) {
		e(error.toString());
	}finally {
		setTimeout(get_temp, 1000*interval);
	}

}

fs.watchFile(config_file, read_config);
read_config('change');
get_temp();
