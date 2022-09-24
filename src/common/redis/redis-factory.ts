const Redis = require("ioredis");
import { redisConf } from "../../app.config";

class RedisFactory {
  private redisMap ={}
  getRedis(db = 0) {
    const config ={
      port: redisConf.port,
      host: redisConf.host,
      //username: "default", // needs Redis >= 6
      password: redisConf.password,
    }
    if( !this.redisMap[db]){
      this.redisMap[db] =  new Redis({ ...config, db });
    }
    return this.redisMap[db];
  }
  async set(db:number,key:string,val:any,ttl?:number){
    const redis = this.getRedis(db)
    await redis.set(key,val)
    if(ttl){
      await redis.expire(key, ttl);
    }
  }

  async expire(db:number,key:string,ttl:number){
    const redis = this.getRedis(db)
    await redis.expire(key, ttl);
  }

  async get(db:number,key:string){
    const redis = this.getRedis(db)
    const res = await redis.get(key)
    return res
  }

  async del(db:number,keys:string[]){
    const redis = this.getRedis(db)
    await redis.del(keys)
  }
}
const redisFactory = new RedisFactory()
export default redisFactory