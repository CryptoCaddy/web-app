===========
Tornado Tax
===========
-------------------------
Cryptocurrency Tax Engine
-------------------------
**NOTE:  This software is in preliminary release for development purposes and has NOT been tested
or vetted very much**


To run locally, from the root directory

runlocal.py --help

or

pytest -s     (run tests and see the output)

Getting CSV files
-----------------
* Gemini:  can download xls, convert to csv in a spreadsheet program
  
* Bittrex: Go to orders, Load All => downloads fillOrders.csv, but a binary file.  Actually
         a unicode file? CSV button gives CSV for the transactions on the screen, only last 7 or
         for year 2018, not sure
* Coinbase: create report -> download.  Gets Coinbase-...csv file
* Gdax:     Accounts->History, Download (choose CSV on dialog box)

(NOTE: fiat here means the taxable currency being calculated on, i.e. USD for U.S.).  At
the moment, hardcoded to USD.

Interface Specs
---------------
See tax.py for documentation on each object or dict

Account+'~'+sym (label) is a pool of crypto that cannot be distiguished for basis

Mapping file (addr.txt) gives address -> Account (for withdrawals)

Software should be able to match up WD and DEPs (not implemented yet)

Operation
---------
See main.py (function run) for complete usage.
Basic idea is to collect all transactions available, then sort by timestamp.  These
are then fed one at a time to the addtx() function of a Tax object.  It calculates
gains and basis tax lots as it goes.

Each updates a dict of tax lots with basis:
account
sym
timestamp
quantity
basis (in fiat)

These get deleted/modified as they are sold, using the FIFO rule.
When all transactions are added, the gains and taxlots remaining can be retrieved
from the Tax object.

Each BUY (symopp!=USD) and SELL each produce a new gain.

NOTES:
Can't do average cost.
Must do FIFO (LIFO an option later).

The system needs an active price feed to determine market prices per day (average High/low)
or per minute. This is passed in as a price_cb function when the Tax object is created.
