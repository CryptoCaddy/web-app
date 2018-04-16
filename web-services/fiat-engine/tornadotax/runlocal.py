#!/usr/bin/env python
#import tornadotax
from run_local import control
from run_local.pricing import Price
from tax_engine import utils

price=Price()  # lookup object
options=control.do_parser()
taxobj=control.run(options, price_cb=Price.get_price)
print('\nRESULTS: GAINS')
utils.print_gains(taxobj.get_gains())
print('\nRESULTS: TAXLOTS LEFT')
utils.print_taxlots(taxobj.get_taxlots())
print('\nRESULTS: INCOME')
utils.print_income(taxobj.get_income())
print('\nRESULTS: EXPENSES')
utils.print_expenses(taxobj.get_expenses())
price.close()
req,cnt=price.get_counts()
print('TOTAL requests {} cached {}'.format(req,cnt))

