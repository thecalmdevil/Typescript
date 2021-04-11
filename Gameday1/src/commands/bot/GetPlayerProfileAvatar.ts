import { CommandoClient, Command, CommandMessage } from "discord.js-commando";
import axios from "axios";
import { steamKeyApiId } from "../../steamapi/SteamAPIKey";
import { steamPlayerSummaries } from "../../steamapi/SteamAPIs";

module.exports = class GetPlayerProfileAvatar extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: 'avi',
            aliases: ['hrty'],
            group: 'bot',
            memberName: 'avi',
            description: 'shows you information about me.'
        });
    }

    async run(msg: CommandMessage, args) {
        const steamid = msg.message.content.replace("$avi ", "");

        const response = axios({
            method: "GET",
            url: ` ${steamPlayerSummaries}?key=${steamKeyApiId}&steamids=${steamid}`
        }).then(response => {
            console.log(response.data.response.players[0]);

            return response.data.response.players[0].avatarfull;
        });
     
        return response.then(res => {
            return msg.channel.send(res);
        }).catch(err => {
            return msg.channel.send("Invalid SteamID");
        });
    }
}
