import asyncio
from app.run import main


if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    loop.run_until_complete(main())
