import argparse
import serial
import time

BT_PORT = "COM5"

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--message", default="Hello", help="message", type=str)
    return parser.parse_args()

def main(message: str):
    ser = serial.Serial(
        port = BT_PORT,
        baudrate = 9600
    )
    pre = "\n"
    send = pre.encode("utf-8")
    ser.write(send)
    pre = message + pre
    send = pre.encode("utf-8")
    ser.write(send)
    print(message)
    #time.sleep(10)
        

if __name__ == "__main__":
    args = parse_args()
    main(**vars(args))