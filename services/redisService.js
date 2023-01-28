const { json } = require('express');
const { Model } = require('sequelize');
const redis = require('redis');
const client = redis.createClient();

client.connect().then(()=>{
  console.log("connected to the redis successfully");
}).catch((err)=>{
  console.log("connection issue in redis : ", err);
});

const setKey =  async (key, data)=>
{
  try
  {
    const timeToLive = 3*24*60*60; // 3 days
    await client.setEx(key, timeToLive, JSON.stringify(data));
  }
  catch(err)
  {
    let errMessage = "Error while settting data in redis";
    console.log(errMessage, err);
  }
}

const getKey = async(key)=>
{
  try
  {
    let stringData = await client.get(key);
    let jsonData = await JSON.parse(stringData);
    return jsonData;
  }
  catch(err)
  {
    let errMessage = "Error while settting data in redis";
    console.log(errMessage, err);
    return null;
  }
}

module.exports = {client, setKey, getKey}