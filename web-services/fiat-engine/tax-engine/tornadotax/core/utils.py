#!/usr/bin/env python
#Copyright (c) 2018 Daniel B. Grunberg
#
#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 3 of the License, or
#(at your option) any later version.
#
#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.
#
#You should have received a copy of the GNU General Public License
#along with this program.  If not, see <http://www.gnu.org/licenses/>.
'''
Utilities for tax calculations
'''
import datetime

def print_gains(gains, header=True):
    #print gains (dict) in nice table format
    if header:
        print('sold       acquired     descr      quantity proceeds      fee    basis      fee     gain')
    if not isinstance(gains, list):
        gains=[gains]
    total_proceeds=0
    total_fee1=0
    total_basis=0
    total_fee2=0
    last_dt=None
    for gain in gains:
        if last_dt is None or gain['dt_sold'].year != last_dt.year:
            print('{:10} {:10} {:12} {:12.4g} {:8.2f} {:8.2f} {:8.2f} {:8.2f} {:8.2f}' \
                  .format('','',
                          'TOTAL',
                          0,
                          total_proceeds,
                          total_fee1,
                          total_basis,
                          total_fee2,
                          total_proceeds-total_fee1-total_basis-total_fee2))
            #reset totals
            total_proceeds=0
            total_fee1=0
            total_basis=0
            total_fee2=0
            print()
        dtstr1=gain['dt_sold'].strftime('%m/%d/%Y')
        dtstr2=gain['dt_acquired'].strftime('%m/%d/%Y')
        descr=gain.get('descr','')
        total_proceeds+=gain['proceeds']
        total_fee1+=gain['fee_sale']
        total_basis+=gain['basis']
        total_fee2+=gain['fee_purchase']
        g=gain['proceeds']-gain['fee_sale']-gain['basis']-gain['fee_purchase']
        print('{:10} {:10} {:12} {:12.4g} {:8.2f} {:8.2f} {:8.2f} {:8.2f} {:8.2f}' \
              .format(dtstr1,dtstr2,
                      descr,
                      gain['quantity'],
                      gain['proceeds'],
                      gain['fee_sale'],
                      gain['basis'],
                      gain['fee_purchase'],
                      g))
        
        last_dt=gain['dt_sold']

    print('{:10} {:10} {:12} {:12.4g} {:8.2f} {:8.2f} {:8.2f} {:8.2f} {:8.2f}' \
          .format('','',
                  'TOTAL',
                  0,
                  total_proceeds,
                  total_fee1,
                  total_basis,
                  total_fee2,
                  total_proceeds-total_fee1-total_basis-total_fee2))

def print_taxlots(taxlots,label=None,header=True):
    #print taxlots in nice table format
    #could be a list of dicts for a single label
    #or dict with the key being the label
    if taxlots=={}:
        print('taxlots is empty dict')
        return
    if taxlots==[]:
        print('taxlots is empty list')
        return
    if header:
        print('label             Date                 Quantity      Gross        Fee')
    if not isinstance(taxlots, dict):
        taxlots={label: taxlots}
    #print out, sorted by account, then symbol, with totals at the end
    keys=taxlots.keys()
    keys=sorted(keys)  # account~sym should be ok
    last_label=None
    for l in keys:
        total_quantity=0
        total_gross=0
        total_fee=0
        for taxlot in taxlots[l]:
            total_quantity+=taxlot['quantity']
            total_gross+=taxlot['gross']
            total_fee+=taxlot['fee']
            dtstr=taxlot['dt'].strftime('%m/%d/%Y %H:%M:%S')
            print('{:16} {:20} {:10.5g} {:10.3g} {:10.3g}'.format(l,dtstr,taxlot['quantity'],taxlot['gross'],taxlot['fee']))
        if total_quantity>0:
            print('{:16} {:20} {:10.5g} {:10.3g} {:10.3g}'.format(l,'TOTAL',total_quantity,total_gross,total_fee))
            print('AVERAGE BASIS {:12.4g}'.format((total_gross-total_fee)/total_quantity))
            print()

def print_expenses(exp):
    print('Date            Amount    Description')
    for x in exp:
        dtstr=x['dt'].strftime('%m/%d/%Y')
        print('{:10}  {:10.4f}  {}'.format(dtstr, x['amount'],x['descr']))
        

def print_income(inc):
    print('Date   Descr      Quantity  Gross ')
    tot=0
    fee=0
    for x in inc:
        dtstr=x['dt'].strftime('%m/%d/%Y')
        print('{:10} {:20} {:10.4g} {:10.2f} {:10.2f}'.format(dtstr, x['descr'],x['quantity'],x['gross'],x['fee']))
        tot+=x['gross']
        fee+=x['fee']
    print('{:10} {:20} {:10.4g} {:10.2f} {:10.2f}'.format('TOTAL', '',0,tot,fee))
