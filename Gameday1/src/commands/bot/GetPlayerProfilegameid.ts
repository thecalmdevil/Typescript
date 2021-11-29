import { CommandoClient, Command, CommandMessage } from "discord.js-commando";
import axios from "axios";
import { steamKeyApiId } from "../../steamapi/SteamAPIKey";
import { steamPlayerSummaries } from "../../steamapi/SteamAPIs";

module.exports = class GetPlayerProfilegameid extends Command {
    constructor(bot: CommandoClient) {
        super(bot, {
            name: 'npid',
            aliases: ['efeg'],
            group: 'bot',
            memberName: 'gameid',
            description: 'shows you the ID of the game the user is playing.'
        });
    }

    async run(msg: CommandMessage, args) {
        const steamid = msg.message.content.replace("$npid ", "");

        const response = axios({
            method: "GET",
            url: ` ${steamPlayerSummaries}?key=${steamKeyApiId}&steamids=${steamid}`
        }).then(response => {
            console.log(response.data.response.players[0]);

            return response.data.response.players[0].gameid;
        });
     
        return response.then(res => {
            return msg.channel.send(res);
        }).catch(_err => msg.channel.send("Invalid SteamID"));
    }
}
