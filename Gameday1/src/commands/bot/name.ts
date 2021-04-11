import { CommandoClient, Command, CommandMessage } from "discord.js-commando";

module.exports = class name extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: 'name',
            aliases: ['o'],
            group: 'bot',
            memberName: 'name',
            description: 'shows you information about me.'
        });
    }

    async run(msg: CommandMessage, args) {
        console.log(msg);
        const user = msg.author.username;
        return msg.channel.send(user);
    }
}
