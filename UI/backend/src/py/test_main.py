import argparse

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--message", default="Hello", help="message", type=str)
    return parser.parse_args()

def main(message: str):
    print(message)

if __name__ == "__main__":
    args = parse_args()
    main(**vars(args))