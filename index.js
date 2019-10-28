require('dotenv').config();
const formatCurrency = require('format-currency')
const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
var _ = require('lodash');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
    var command_item = "!item";
    var called_url_allitem = process.env.POPORING_BASE_URL+"/get_item_list";
    var origin = "https://poporing.life";
    if (msg.content.startsWith(command_item)) {
        var keyword_raw = msg.content.substring(command_item.length+1);
        if(keyword_raw === undefined){
            msg.reply('no data value to search')
        }else{
            axios.get(called_url_allitem, {
                headers: {
                    "Origin": origin,
                }
            }).then(response => {
                var item_list = response.data.data.item_list;
                var keyword_arr = _.filter(item_list,function (item){
                        return _.startsWith(item.display_name.toLocaleLowerCase(),keyword_raw.toLocaleLowerCase());
                });
                var called_url = "";
                if(!keyword_arr.length){
                    msg.channel.send("Sorry No Data Found ! \n");
                }
                for (let i = 0; i < keyword_arr.length ; i++) {
                    called_url = process.env.POPORING_BASE_URL+"/get_latest_price/"+keyword_arr[i].name;
                    axios.get(called_url, {
                        headers: {
                            "Origin": origin,
                        }
                    }).then(response => {
                        var image = "https://cdn2.iconfinder.com/data/icons/symbol-gray-set-3a/100/1-17-128.png";
                        if(keyword_arr[i].image_url !== null){
                           image = "https://static.poporing.life/items/"+keyword_arr[i].image_url;
                        }
                        var message = "Name: "+keyword_arr[i].display_name+"\n";
                        message += "Price: "+formatCurrency(response.data.data.data.price)+" Zeny\n";
                        message += "Volume: "+response.data.data.data.volume+"\n";
                        message += "Item Type: "+keyword_arr[i].item_type+"\n";
                        if(i===0){
                            msg.channel.send("Midnight Party Server Data: \n");
                        }
                        msg.channel.send(message,{files: [image]});
                    }).catch(function (error){
                        return error;
                    });
                }
            }).catch(function (error){
                return error;
            });
        }
    }
});



client.login(process.env.BOT_TOKEN);
