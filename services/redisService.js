const { json } = require('express');
const { Model } = require('sequelize');
const redis = require('redis');
const client = redis.createClient();

client.connect().then(()=>{
  console.log("connected to the redis successfully");
}).catch((err)=>{
  console.log("connection issue in redis : ", err);
});

exports.setKey =  async (key, data)=>
{
  try
  {
    await client.set(key, JSON.stringify(data));
  }
  catch(err)
  {
    let errMessage = "Error while settting data in redis";
    console.log(errMessage, err);
  }
}

exports.getKey = async(key)=>
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

exports.delKey = async(key)=>
{
  try
  {
    await client.del(key);
    return true;
  }
  catch(err)
  {
    let errMessage = "Error while deleting key in redis";
    console.log(errMessage, err);
    return false;
  }
}