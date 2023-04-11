import json
import threading
import time
from datetime import datetime
import socket

import serial
import struct

import json
import multiprocessing

from kafka import KafkaProducer
import paho.mqtt.client as mqtt
import time


# ioLory receiver(COM5)
# Making serial port
# port_name : Using port name
def make_port(port_name):
    ser = serial.Serial(
        port=port_name,
        baudrate=9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_TWO,
        bytesize=serial.EIGHTBITS,
        timeout=0.05
    )
    ser.isOpen()
    print('receiver open')

    return ser


# Running Port
serial_port = make_port('COM4')
tick = 1
count = 10

# Receiving Data, Thread 1, this function read byte data from serial port and save in datalist
# ser : serial port
# datalist : global memory for sharing data with other threads

def receive_data(serial_port):
    now = datetime.now()
    timestamp = now.strftime('%Y-%m-%d %H:%M:%S')

    if serial_port.readable():
        data = serial_port.readline().decode('utf-8')
        print(data)
        if len(data)>3:
        
            strings = data.split(",")
            topic = strings[9]
        
            print("receive data: ", timestamp, " / ", data)
            kafka_producer = KafkaProducer(bootstrap_servers='localhost:9092',
                                   value_serializer=lambda v: v.encode('utf-8'))

            if kafka_producer.send(topic, data):
                print('LoRa in KAFKA out - ' + str(data.encode('utf-8')) + ' to ' + topic)


    return


while True:
    receive_data(serial_port)
    time.sleep(0.1)

def on_message(client, userdata, message):
    m_in = str(message.payload.decode("utf-8", "ignore"))
    strings = data.split(",")
    topic = strings[9]




user_list = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]


if __name__ == '__main__':
    # 컨슈머 멀티프로세싱
    pool = multiprocessing.Pool(processes=10)
    pool.map(connect, user_list)


