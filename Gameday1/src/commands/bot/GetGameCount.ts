import { CommandoClient, Command, CommandMessage } from "discord.js-commando";
import axios from "axios";

module.exports = class GetGameCount extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: 'games',
            aliases: ['euifhiue'],
            group: 'bot',
            memberName: 'games',
            description: 'shows you information about me.'
        });
    }

    async run(msg: CommandMessage, args) {
        const steamid = msg.message.content.replace("$games ", "");

        const response = axios({
            method: "GET",
            url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKeyApiId}&steamid=${steamid}&format=json`
        }).then(response => {
            console.log(response.data.response.game_count);

            return response.data.response.game_count;
        });
     
        return response.then(res => {
            return msg.channel.send(res);
        }).catch(err => {
            return msg.channel.send("Invalid SteamID");
        });
    }
}
