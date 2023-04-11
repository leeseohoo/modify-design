
import multiprocessing
import asyncio
import pymysql

from kafka import KafkaConsumer
from asyncio.log import logger

import pandas as pd
import socketio

from data_handle import DataHanlder as dh
from buffer_to_display import Buffer as bf
from SocketClient import SocketClient as SocketClient
# from SocketClient import SocketClient2 as SocketClient2


"""user# 토픽에서 데이터 받아 db에 저장"""

class MessageConsumer():
    topic =""
    def __init__(self, topic):
        self.topic = topic
        # history db
        self.data_handler = dh(self.topic)
        # bufffer 
        self.buff = bf(self.topic)
        # DB연결
        self.client = SocketClient(self.topic) # Socket Client
        self.conn = pymysql.connect(host='127.0.0.1', user='root', password='12341234', db='motionDB', charset='utf8')
        self.cur = self.conn.cursor()
        sql = 'DROP TABLE IF EXISTS ' + self.topic
        self.cur.execute(sql)

        print(self.topic + " table created")
        sql = 'CREATE TABLE ' + self.topic + ' (timestamp datetime PRIMARY KEY, ' \
                                             'devid int(3),' \
                                             'data text)'
                                             
        self.cur.execute(sql)
        self.conn.commit()

        self.activate_listener()

    def activate_listener(self):
        consumer = KafkaConsumer(bootstrap_servers='localhost:9092',
                                 group_id='team',
                                 consumer_timeout_ms=60000,
                                 auto_offset_reset='earliest',
                                 enable_auto_commit=False,
                                 #value_deserializer=lambda m: json.loads(m.decode('utf-8'))
                                 )

        consumer.subscribe(self.topic)
        print(self.topic + ": consumer open")
        try:
            for message in consumer:
                m_decode = str(message.value.decode("utf-8", "ignore"))
                m_in = m_decode[:len(m_decode)]

                strings = m_in.split(",")
                timestamp = strings[0]
                did = strings[1]
                # timestamp = str(m_json['timestamp'])
                #g_x = str(m_json["g_x"])
                #g_y = str(m_json["g_y"])
                #g_z = str(m_json["g_z"])
                #a_x = str(m_json["a_x"])
                #a_y = str(m_json["a_y"])
                #a_z = str(m_json["a_z"])
                # heartrate = str(m_json["heartrate"])
                # temp = str(m_json["temp"])
                # resp = str(m_json["resp"])
                batteryLv = strings[2]
                heartrate = strings[3]
                temp = strings[4]
                resp = strings[5]
                motion = strings[7]
                uid = strings[8]
                username = strings[9]
    
                '''
                sql = 'INSERT INTO ' + self.topic + ' (timestamp, g_x, g_y, g_z, a_x, a_y, a_z, heartrate, resp, temp) VALUES (\''+timestamp+'\', '+g_x+', '+g_y+' ,'+g_z+' ,'+a_x+' ,'+a_y+', '+a_z+', '+heartrate+', '+resp+' ,'+temp+');'
                
                if self.cur.execute(sql):
                    print(self.topic + " DB save : " + str(m_json))
                # committing message manually after reading from the topic
                self.conn.commit()
                consumer.commit()
                
                # access to history db 
                self.data_handler.thread_data_handler(timestamp, g_x, g_y, g_z, a_x, a_y, a_z, heartrate, resp, temp)
                
                # add data to bufffer
                self.buff.set_data(m_json)
                '''
                asyncio.get_event_loop().run_until_complete(self.client.send(m_in)) # 비동기적 Socket Client 실행
                # asyncio.run(self.client2.main(json.dumps(m_json))) # Socket Server - Error❌
                
                # make json
                # file_path = '/Users/lunarmoon/Github_Repo/hpe-study/src/Components/detail/' + self.topic + '.json'
                # with open(file_path, 'w', encoding='utf-8') as file:
                #     json.dump(m_json, file, indent='\t')
                
        except Exception as e:
            print(e)
            logger.exception("failed to create %s", e)
            
        finally:
            # while not self.buff.empty():
            #     print(self.topic,': ',self.buff.get_data())
            consumer.close()

if __name__ == '__main__':
    user_list = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    
    pool = multiprocessing.Pool(processes=10)
    pool.map(MessageConsumer, user_list)
