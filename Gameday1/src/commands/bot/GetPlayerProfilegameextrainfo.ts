import { CommandoClient, Command, CommandMessage } from "discord.js-commando";
import axios from "axios";
import { steamKeyApiId } from "../../steamapi/SteamAPIKey";
import { steamPlayerSummaries } from "../../steamapi/SteamAPIs";

module.exports = class GetPlayerProfilegameextrainfo extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: 'np',
            aliases: ['hrth'],
            group: 'bot',
            memberName: 'playing',
            description: 'shows you what game the user is playing.'
        });
    }

    async run(msg: CommandMessage, args) {
        const steamid = msg.message.content.replace("$np ", "");

        const response = axios({
            method: "GET",
            url: ` ${steamPlayerSummaries}?key=${steamKeyApiId}&steamids=${steamid}`
        }).then(response => {
            console.log(response.data.response.players[0]);

            return response.data.response.players[0].gameextrainfo;
        });
     
        return response.then(res => {
            return msg.channel.send(res);
        }).catch(err => {
            return msg.channel.send("Invalid SteamID");
        });
    }
}
