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
    for gain in gains:
        dtstr1=gain['dt_sold'].strftime('%m/%d/%Y')
        dtstr2=gain['dt_acquired'].strftime('%m/%d/%Y')
        descr=gain.get('descr','')
        g=gain['proceeds']-gain['fee_sale']-gain['basis']-gain['fee_purchase']
        print('{:10} {:10} {:10} {:10.2f} {:8.3f} {:8.3f} {:8.3f} {:8.3f} {:8.3f}' \
              .format(dtstr1,dtstr2,
                      descr,
                      gain['quantity'],
                      gain['proceeds'],
                      gain['fee_sale'],
                      gain['basis'],
                      gain['fee_purchase'],
                      g))
    
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
        print('label             Date                Quantity     Gross       Fee')
    if not isinstance(taxlots, dict):
        taxlots={label: taxlots}
    for label, tl in taxlots.items():
        for taxlot in tl:
            dtstr=taxlot['dt'].strftime('%m/%d/%Y %H:%M:%S')
            print('{:16} {:20} {:8.1f} {:9.3f} {:9.3f}'.format(label,dtstr,taxlot['quantity'],taxlot['gross'],taxlot['fee']))
          
