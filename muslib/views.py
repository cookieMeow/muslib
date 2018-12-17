from django.shortcuts import render

import requests

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader

def index(request):
    if request.method == "GET":
        return render(request,"index.html")

def musics(request):
    if request.method == "GET":
        return render(request,"musics.html")

# Create your views here.

import eyed3
from eyed3 import id3
import os
from mutagen.easyid3 import EasyID3
import re
import json
import time
import requests
# import year
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

from operator import itemgetter

def search(keywords, filters):
    urlSearch = 'https://inf551-b516a.firebaseio.com/index.json'
    responseSearch = requests.get(urlSearch)
    inverted_dic = responseSearch.json()
    result = []
    for key in keywords:
        key = key.lower()
        if (key in inverted_dic):
            keyResult = inverted_dic[key]
            if(len(result) == 0):
                result = keyResult
            else:
                result = [i for i in keyResult if i in result]

    result1 = []
    if(len(filters) != 0):
        for key in filters:
            key = key.lower()
            if (key in inverted_dic):
                keyResult = inverted_dic[key]
                for item in keyResult:
                    if item not in result1:
                        result1.append(item)
        if(len(keywords) == 0):
            result2 = result1
        else:
            result2 = [i for i in result if i in result1]
    else:
        result2 = result
    return result2


urlRe = 'https://inf551-b516a.firebaseio.com/music.json'
responseRe = requests.get(urlRe)
musicRe = responseRe.json()

def SearchResult(request):
    if request.method == "POST":
        rec = json.loads(request.body.decode('utf-8'))

        keywords=rec['keywords']
        filters=rec['filters']
        if (len(keywords) == 0 and len(filters) == 0):
            seaRe = musicRe
        else:
            seaRe = search(keywords, filters)
        returnRe = {}
        returnRe['album'] = []
        returnRe['artist'] = []
        returnRe['genre'] = []
        returnRe['rawdata'] = []
        filterRe = {}
        filterRe['album'] = {}
        filterRe['artist'] = {}
        filterRe['genre'] = {}
        filterRe['rawdata'] = []
        for tit in seaRe:
            seaAlbum = musicRe[tit]['album']
            seaArtist = musicRe[tit]['artist']
            seaGenre = musicRe[tit]['genre']
            filterRe['rawdata'].append(musicRe[tit])
            if( seaAlbum in filterRe['album']):
                filterRe['album'][seaAlbum] += 1
            else:
                filterRe['album'][seaAlbum] = 1
            if( seaArtist in filterRe['artist']):
                filterRe['artist'][seaArtist] += 1
            else:
                filterRe['artist'][seaArtist] = 1
            if( seaGenre in filterRe['genre']):
                filterRe['genre'][seaGenre] += 1
            else:
                filterRe['genre'][seaGenre] = 1 
        for item in filterRe['album']:
            temp = {'name': item, 'count': filterRe['album'][item]}
            returnRe['album'].append(temp)
        for item in filterRe['artist']:
            temp = {'name': item, 'count': filterRe['artist'][item]}
            returnRe['artist'].append(temp)
        for item in filterRe['genre']:
            temp = {'name': item, 'count': filterRe['genre'][item]}
            returnRe['genre'].append(temp)
        returnRe['rawdata'] = filterRe['rawdata']
        returnRe['album'] = sorted(returnRe['album'], key=itemgetter('count'), reverse = True)
        returnRe['artist'] = sorted(returnRe['artist'], key=itemgetter('count'), reverse = True)
        returnRe['genre'] = sorted(returnRe['genre'], key=itemgetter('count'), reverse = True)
        return HttpResponse(json.dumps(returnRe), content_type="application/json")