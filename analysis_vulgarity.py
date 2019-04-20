import json


with open('alfred_data_book.json') as f:
			#sentiment_dict={}
			vulgarity_dict={}
			vulgarity_dict_print={}
			#sentiment_dict_2={}
			data = json.load(f)
			#parsed_json = data["corpus"] 
			for item in data:
				docId = item.get("product_id")
				if docId not in vulgarity_dict:
					vulgarity_dict[docId]=[] #{'positive':0,'negative':0,'neutral':0}
				#if docId not in sentiment_dict:
				#	sentiment_dict[docId]={'positive':0,'negative':0,'neutral':0}
				vulgarity=item.get("vulgarity")
				vulgarity_dict[docId].append(vulgarity)
			for key in vulgarity_dict.keys():
				doc_max = max(vulgarity_dict[key])
				doc_min = min(vulgarity_dict[key])
				vulgarity_dict_2={'0':0,'1':0,'2':0,'3':0}
				for item in range(len(vulgarity_dict[key])):
					if (doc_max-doc_min)!=0:
						vulgarity_dict[key][item]=(vulgarity_dict[key][item]-doc_min)/(doc_max-doc_min)
						
					# print(vulgarity_dict[key][item])
					
					if vulgarity_dict[key][item] < 0.25:
						vulgarity_dict_2['0']+=1
					elif vulgarity_dict[key][item] < 0.50:
						vulgarity_dict_2['1']+=1
					elif vulgarity_dict[key][item] < 0.75:
						vulgarity_dict_2['2']+=1
					elif vulgarity_dict[key][item] <= 1:
						vulgarity_dict_2['3']+=1
					# print(vulgarity_dict_2)
				vulgarity_dict_print[key]=[{"bin":"0-25","number":vulgarity_dict_2['0']},{"bin":"25-50","number":vulgarity_dict_2['1']},{"bin":"50-75","number":vulgarity_dict_2['2']},{"bin":"75-100","number":vulgarity_dict_2['3']}]

				#sentiment_dict_2[docId]=[{"label":"positive","value":sentiment_dict[docId]['positive'],"color":"#387e45"},{"label":"negative","value":sentiment_dict[docId]['negative'],"color": "#7e3838"},{"label":"neutral","value":sentiment_dict[docId]['neutral'],"color": "#c0c51f"}]
			'''for key in sentiment_dict:
				total=sentiment_dict[key]['positive']+sentiment_dict[key]['negative']+sentiment_dict[key]['neutral']
				for s in sentiment_dict[key]:
					sentiment_dict[key][s]=sentiment_dict[key][s]/total'''
			with open('vulgarity_book.json', 'w') as fp:
				json.dump(vulgarity_dict_print, fp,indent=4)
			#print(vulgarity_dict_print)