import sys
import os
z1=os.path.dirname(os.path.abspath(__file__)) 
z2=os.path.abspath(z1+'/..')      # move up to the root directory so we can import packages
sys.path.insert(0, z2)
from tornadotax.core import tax
from tornadotax.core import utils
from tornadotax.runlocal import importer
from tornadotax.runlocal import control

class Obj():
    pass

def sym_price(sym, date):
    #dummy price function
    if sym=='BTC':
        return 6000
    elif sym=='ETH':
        return 520
    else:
        return 1.0

def test_single():
    options=Obj()
    options.file='tests/files1.txt'   # directory is relative to root
    options.addr=None
    taxobj=control.run(options)
    print('RESULTS: GAINS')
    utils.print_gains(taxobj.get_gains())
    print('RESULTS: TAXLOTS LEFT')
    utils.print_taxlots(taxobj.get_taxlots())
    assert(taxobj.total_proceeds()==5100)
    assert(taxobj.total_basis()==5000)
    assert(taxobj.total_taxlots()==[1,5000,0])   #Not great to test quality on floats, but works
    
def test_double():
    options=Obj()
    options.file='tests/files2.txt'   # directory is relative to root
    options.addr='tests/addr.txt'
    taxobj=control.run(options, price_cb=sym_price)
    print('\nRESULTS: GAINS (FORM 8949)')
    gains=taxobj.get_gains()
    utils.print_gains(gains)
    print('RESULTS: REMAINING TAXLOTS')
    utils.print_taxlots(taxobj.get_taxlots())
    assert(taxobj.total_proceeds()==9880)
    assert(len(gains)==3)
    assert(taxobj.total_basis()==9580)
    assert(taxobj.total_taxlots()==[1.5,3020,0])   #Not great to test quality on floats, but works
    #assert(False)   # if you want to see the printout for the above test, uncomment this
    
