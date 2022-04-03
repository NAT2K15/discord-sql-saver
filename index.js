const { MessageEmbed, WebhookClient } = require('discord.js');
const mysqldump = require('mysqldump');
const config = require('./config');
const chalk = require('chalk')

setInterval(async() => {
    mysqldump({
        connection: {
            host: config.connection.host,
            user: config.connection.user,
            password: config.connection.password,
            database: config.connection.database,

        },
        dumpToFile: './dump.sql'
    });

    const webhookClient = new WebhookClient({ id: config.webhook.split('https://discord.com/api/webhooks/')[1].split('/')[0], token: config.webhook.split('https://discord.com/api/webhooks/')[1].split('/')[1] });
    let time = Math.round(+new Date() / 1000)
    const embed = new MessageEmbed()
        .setTitle(`SQL BACKUP | ${config.connection.database}`)
        .setColor(config.embed.color)
        .setDescription(`This database file has been saved on <t:${time}>`)

    setTimeout(() => {
        webhookClient.send({
            username: 'SQL Backup',
            embeds: [embed],
            files: ['./dump.sql']
        });
    }, 15000)


}, 1000 * 60 * config.time)

console.log(chalk.green `[ONLINE]` + chalk.white ` I am now watching the database`)