import React, { Component } from 'react';
import { FlatList, Image, Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { RadioButton } from 'react-native-paper';
import Header from './Header';
import BottomMenu from './BottomMenu';
import { useNavigation } from '@react-navigation/native';
const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');



const styles = StyleSheet.create({
    home: {
        backgroundColor: 'coral',
        height:'80%',
    },
    title: {
        backgroundColor: 'darkgrey',
        fontSize: 36,
        textAlign: 'center',
    },

    display: {
        backgroundColor: 'antiquewhite',
        marginTop: 10,
        marginBottom: 0,
        marginRight: 10,
        marginLeft: 10,
        height:'85%',
    },
    nameInput: {
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 2,
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        textAlign: 'center',
    },
    box: {
        height: '100%',

    },
    criteriaInput: {
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 2,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 22,
        textAlign: 'center',
    },
    criteriaButton: { 
        marginRight: 10,
        marginLeft: 10,
        
    },
    radioButtons:{
        flexDirection:'row',
        marginLeft:'auto',
        marginRight:'auto',
    },
    criteriaName:{
        textAlign:'center',
                    fontSize:20,
    },


});



function AddButton(props) {
   
    const navigation = useNavigation();
    const client = Stitch.defaultAppClient;
    const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('rankdb');

   function addItem() {
       console.log('add props empty itemCat', props.state)
        db.collection('ranks').insertOne({
            owner_id: client.auth.user.id,
            itemCatagory:props.name,
            itemName: props.state.itemName,
            [props.state.criteriaOne]: props.state.one,
            [props.state.criteriaTwo]: props.state.two,
            [props.state.criteriaThree]: props.state.three,
        })
        console.log('item added!')
    }

    return(
<View style={styles.criteriaButton}>
    <Button onPress={() => { navigation.navigate('Home'); addItem() }} title={'Add new item'}></Button>
</View>
    )}

class Display extends Component {
    state = {
        checked: 'first',
    };


    
  
    render() {
        const { checked } = this.state;
return (
<View>

    <Text style={styles.criteriaName}> {this.props.criteria}</Text>
        <View style={styles.radioButtons} >
        <RadioButton
                onClick={(event) => { this.props.handleChange(this.props.number, 1) }}
            value='1'
            status={checked === 1 ? 'checked' : 'unchecked'}
            onPress={() => { this.setState({ checked: 1 })
        }}
        />
        <RadioButton
                onClick={(event) => { this.props.handleChange(this.props.number, 2) }}
            value= '2'
            status={checked === 2 ? 'checked' : 'unchecked'}
            onPress={() => { this.setState({ checked: 2 }); }}
        />
        <RadioButton
                onClick={(event) => { this.props.handleChange(this.props.number, 3) }}
            value='3'
            status={checked === 3 ? 'checked': 'unchecked'}
            onPress={() => { this.setState({ checked: 3 }); }}
        />
        <RadioButton
                onClick={(event) => { this.props.handleChange(this.props.number, 4) }}
            value='4'
            status={checked === 4 ? 'checked' : 'unchecked'}
            onPress={() => { this.setState({ checked: 4 }); }}
        />
        <RadioButton
                onClick={(event) => { this.props.handleChange(this.props.number, 5) }}
            value='5'
            status={checked === 5 ? 'checked' : 'unchecked'}
            onPress={() => { this.setState({ checked: 5 }); }}
        />
    </View>
   
</View>
)
    }
}

class NewItem extends Component {

    // client = Stitch.defaultAppClient;
    // db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('rankdb');
    

    state = {
        categoryName: this.props.route.params.catagoryTitle,
        criteriaOne: this.props.route.params.criteriaOne,
        criteriaTwo: this.props.route.params.criteriaTwo,
        criteriaThree: this.props.route.params.criteriaThree,
        one:'',
        two:'',
        three:'',
        itemName:'',
    }



//     addItem() {
//     this.db.collection('ranks').insertOne({
//         owner_id: this.client.auth.user.id,
//         itemCatagory: this.state.categoryName,
//         itemName:this.state.itemName,
//         [this.state.criteriaOne]: this.state.one,
//         [this.state.criteriaTwo]: this.state.two,
//         [this.state.criteriaThree]:this.state.three,
//     })
//     console.log('item added!', this.state)
// }
    handleChange = (typeOf, score) => {
        this.setState({
            ...this.state,
            [typeOf]: score
        })
        console.log(this.state)
    }

    handleText=(event)=>{
        this.setState({...this.state,
            itemName:event.target.value
        })
    }

    render() {

        console.log('checking props new item', this.props)

        return (
            <View style={styles.box}>
                <Header />
           
            <View style={styles.home}>
                <View style={styles.display}>
                        <Text style={styles.title}>{this.state.categoryName}</Text>
                <br></br>
                        <TextInput placeholder={'Item Name'} onChange={this.handleText}
                            style={styles.criteriaInput} />
<br></br>
                        <Display handleChange={this.handleChange} criteria={this.state.criteriaOne} number={'one'} />
                        <Display handleChange={this.handleChange} criteria={this.state.criteriaTwo} number={'two'} />
                        <Display handleChange={this.handleChange} criteria={this.state.criteriaThree} number={'three'} />
            <br></br>

                    <AddButton name={this.state.categoryName} state={this.state} />
                   
                </View>
                </View>
<BottomMenu />
</View>


        )
    }
}


export default NewItem;
