import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from './localdb'

export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Loading...",
      lexicalCategory :'',
      definition : ""
    };
  }

  getWord=(text)=>{
    var text = text.toLowerCase();
    try{
      var word = dictionary[text]["word"]
      var definition=dictionary[text]["definition"]
      var lexicalCategory=dictionary[text]["lexicalCategory"]
      this.setState({
        "word": word,
        "definition": definition,
        "lexicalCategory": lexicalCategory 
      })
    }

    catch(err){
      alert("Sorry, this word does not exist in our dictionary")
      this.setState({
        'text':'',
        'isSearchPressed':false
      })
    }
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Text style={{ padding: 20,fontSize: 22,textAlign: 'center',}}>
           Dictionary app
        </Text>
        <Image style={{width:200,height:200,marginLeft:700}} source ={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIEJpzw5cDTdIbD8f5TPwWp93knvkYzCrRXA&usqp=CAU'}}/>
           <View style={styles.inputBoxContainer}>
        <TextInput
          style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
            }}
          value={this.state.text}
        />

        <TouchableOpacity
           style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>

        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>{
            this.state.isSearchPressed && this.state.word === "Loading..."
            ? this.state.word
            : ""}
          </Text>
            {
          this.state.word !== "Loading..." ?(
              <View style={{justifyContent:'center', marginLeft:10 }}>
              <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>
                Word :{" "}
              </Text>
              <Text style={{fontSize:18 }}>
                {this.state.word}
               </Text>
              </View>
              <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>
                Type :{" "}
              </Text>
              <Text style={{fontSize: 20}}>
                {this.state.lexicalCategory}
              </Text>
              </View>
               <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                  <Text style={styles.detailsTitle}>
                    Definition :{" "}
                  </Text>
                  <Text style={{ fontSize:18}}>
                    {this.state.definition}
                  </Text>
               </View>
            </View>
          )
              :null 
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBoxContainer: {
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 5,
  },
  searchButton: {
    backgroundColor: 'lavender',
    width: '44%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 19,
    borderWidth: 4,
    borderRadius: 10,   
  },
  searchText:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  outputContainer:{
    flex:0.7,
    alignItems:'center'
  },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    fontSize:20,
    fontWeight:'bold'
  }
});
