#Copyright (c) 2018 Daniel B. Grunberg
#
#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU Affero General Public License version 3 as published by
#the Free Software Foundation.
#
#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.
#
#You should have received a copy of the GNU Affero General Public License
#along with this program.  If not, see <http://www.gnu.org/licenses/>.
'''
Crypto tax calculations
'''
import csv
import sys
import os
import argparse
import traceback
import datetime
from . import importer
from . import tax

def read_addr_map(file):
    #read the addr file and return the dict of addres->account mappings
    ret={}
    if file is None:
        return ret
    #raise ValueError('cannot find addr file {}'.format(file))
    with open(file,'rt') as fp:
        for line in fp:
            if len(line)<2 or line[0]=='#':
                continue
            parts=line.split()
            if len(parts)>=2:
                ret[parts[0]]=parts[1]
    #print('got addr mapping {}'.format(ret))
    return ret
            
def do_parser():
    parser = argparse.ArgumentParser(
        description="tax calculations",
        epilog='''
          process files from list.  They are assumed to be in same directory as file list
        ''')
    dfile='~/CryptoRecords/files.txt'
    dfile=os.path.expanduser(dfile)
    afile='~/CryptoRecords/addr.txt'
    afile=os.path.expanduser(afile)
    #parser.add_argument("-v", dest='stdout', help='send log file output to stdout', action='store_true')
    #parser.add_argument('--config', help='config file directory', default=os.path.join(home,'.rsbackup'))
    #parser.add_argument('--disk', type=int,help='disk number to backup', default=0)
    #parser.add_argument('--create', help='make this a new backup disk', action='store_true')
    #parser.add_argument('--wipe', help='wipe out database and start over', action='store_true')
    parser.add_argument('--file', help='file with list of files to import', type=str, default=dfile)
    parser.add_argument('--addr', help='file addr -> account mappings', type=str, default=afile)
    #os.makedirs(os.path.join(home,, exist_ok=True)
    options = parser.parse_args()
    return options

class Obj:
    def __str__(self):
        return str(self.__dict__)

def run(options, price_cb=None):
    #options is argparser or other object with attributes used as options
    #If running from commandline, run  tornadotax/runlocal.py
    dir=os.path.dirname(options.file)
    #os.chdir
    txs=[]
    print('using file list in {}'.format(os.path.realpath(options.file)))
    with open(options.file, 'rt') as fp:
        for line in fp:
            #print('line={}'.format(line))
            if len(line)<2 or line[0]=='#':
                continue
            typ,acct,file=line.split()
            if typ=='bittrex':
                iobject=importer.Bittrex()
            elif typ=='gemini':
                iobject=importer.Gemini()
            elif typ=='simple':
                iobject=importer.Simple()
            else:
                print('{} not implemented yet'.format(typ))
                continue
            path=os.path.join(dir,file)
            print('opening {}'.format(os.path.realpath(path)))
            with open(path, encoding='utf-8') as csvfile:
                for i,row in enumerate(csv.reader(csvfile,delimiter=',')):
                    if i==0 or len(row)<3:
                        continue
                    try:
                        x=iobject.parse(row, account=acct)
                        if x is not None:
                            #print(x)
                            txs.append(x)
                    except Exception as ex:
                        print('Error {}'.format(ex))
                        for i,a in enumerate(row):
                            print('{:4} {}'.format(i,a))
                        traceback.print_exc()
    #Now txs is the list of transactions.  We should sort, then process with tax stuff
    addr=read_addr_map(options.addr)
    txs_sorted=sorted(txs, key=lambda x: x.dt)
    taxobj=tax.Tax(addr=addr, price_cb=price_cb)
    print('Starting transaction processing:')
    for tx in txs_sorted:
        try:
            print('\n*****adding:{} {}\n{}'.format(tx.action,tx.dt,tx))
            taxobj.addtx(tx)
        except Exception as ex:
            print('exception on tx={}'.format(tx))
            traceback.print_exc()
            sys.exit(1)
    return taxobj

        
            
            
            
            
    
    
