#!/usr/bin/env python
#__name__ : this is '__main__' when this file is run as a script
#__package__='runlocal'
'''
NOTE:
This runlocal does not work, due to some problem with relative imports and/or packages
Try runlocal.py at the root of the hierarchy (directory above tornadotax) - that works.
'''
#from . import control
#from . import pricing
from control import do_parser, run


price=pricing.Price()  # lookup object
options=do_parser()
taxobj=tornadotax.main.run(options, price_cb=Price.get_price)
print('\nRESULTS: GAINS')
tornadotax.utils.print_gains(taxobj.get_gains())
print('\nRESULTS: TAXLOTS LEFT')
tornadotax.utils.print_taxlots(taxobj.get_taxlots())
print('\nRESULTS: INCOME')
tornadotax.utils.print_income(taxobj.get_income())
print('\nRESULTS: EXPENSES')
tornadotax.utils.print_expenses(taxobj.get_expenses())
price.close()
req,cnt=price.get_counts()
print('TOTAL requests {} cached {}'.format(req,cnt))

