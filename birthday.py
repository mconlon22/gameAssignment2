import random 
import math
import matplotlib.pyplot as plt

def testGroup(N,d):
    group={}
    numcollisions=0
    # we are doing 1000000 iterations 
    iterations=100000
    for i in range(0,100000):
        #generate group of N, d bit hashes
        group={}

        for i in range(0,N):
            bits=random.getrandbits(d)
            if bits not in group:
                group[bits]=1
            else:
                numcollisions+=1
                break
    return numcollisions/iterations

def calculateProbability(d):
    Ns=[]
    probabilitys=[]
    for x in range(2,d):
        N=int(math.pow(2,x))
        Ns.append(N)
        probabilitys.append(testGroup(N,d))
    print(Ns, probabilitys)
    plt.plot(Ns, probabilitys)
    plt.show()
calculateProbability(8)