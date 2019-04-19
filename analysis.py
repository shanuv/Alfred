import json


with open('alfred_data_book.json') as f:
			sentiment_dict={}
			data = json.load(f)
			#parsed_json = data["corpus"] 
			for item in data:
				docId = item.get("product_id")
				if docId not in sentiment_dict:
					sentiment_dict[docId]={'positive':0,'negative':0,'neutral':0}
				sentiment=item.get("sentiment")
				sentiment_dict[docId][sentiment]+=1
			'''for key in sentiment_dict:
				total=sentiment_dict[key]['positive']+sentiment_dict[key]['negative']+sentiment_dict[key]['neutral']
				for s in sentiment_dict[key]:
					sentiment_dict[key][s]=sentiment_dict[key][s]/total'''
			with open('sentiment_book.json', 'w') as fp:
				json.dump(sentiment_dict, fp,indent=4)
			#print(sentiment_dict)