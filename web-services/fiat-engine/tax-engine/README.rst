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
         a unicode file? CSV button gives CSV for the transactions on the screen.  This file
         does not contain any deposits or withdrawals.  For that, go to Wallets and look
         at Withdrawal History and Deposit History.  
         #to transcode:
         iconv -f UTF-16LE -t UTF-8 /var/data/Downloads/fullOrders.csv  > bittrex-trial-orders-utf8.c
         According to customer support, you cannot get csv file for deposit/withdrawals online,
         but they will email to you via support ticket.
         
* Coinbase: create report -> download.  Gets Coinbase-...csv file
* Gdax:     Accounts->History, Download (choose CSV on dialog box).  Does not seem to be
            able to get reasonable transaction history!  Might have to go API route.

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

Issues
------

#. Matching up WD and DEP between accounts is difficult.  It can sometimes be done through
   blockchain_tx field.  Tax.addtx will give a WARNING if it cannot match up.  For now,
   creates a new taxlot with 0 basis in that case.  User will need to have a way to modify
   things to fix.  For a UI based system, perhaps we can flag items as WARNINGS and the user can
   have a way to fix them, and set the flag to fixed.  We also need to make sure that the
   DEP comes after (in time) the WD, or there is no way to match it up.  Perhaps there should
   be some kind of matching report that gives the matches and unmatched DEP/WD tx's so
   that users can link them up - either fill in missing tx info, or have the system
   create tx id's that link them up.
   
#. There needs to be a way to incorporate crypto transfer fees.  The WD transactions
   from exchanges do not usually contain those fees (sometimes not paid by the user,
   but covered by the exchange).  So mainly for transfers from a wallet, we need to make sure
   they are included in the WD tx from a wallet to another location.

#. Fees need more testing to be sure handled properly.  Not included in 
   the beginning WD and DEP matching report.
