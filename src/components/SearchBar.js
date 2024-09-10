import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
      }
    render(){ 
        return (
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..."
                    value={this.props.searchQuery}
                    onChangeText={this.props.handleSearch}
                />
                <TouchableOpacity onPress={this.props.clearSearch}>
                    <Text style={styles.clearButton}>x</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBar: {
        width: "90%",
        height: 32,
        marginTop: 8,
        padding: 0,
        backgroundColor: 'rgb(220, 230, 232)',
        fontSize: RFValue(16),
        color: '#5d8da0',
        fontFamily: 'helvetica77',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButton: {
        fontSize: RFValue(16),
        color: '#5d8da0',
        fontFamily: 'helvetica77',
    },
});