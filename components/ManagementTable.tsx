import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const ManagementTable = () => {
    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Title</Text>
                <Text style={styles.headerCell}>Trend Type</Text>
                <Text style={styles.headerCell}>Timeframe</Text>
                <Text style={styles.headerCell}>Impact</Text>
                <Text style={styles.headerCell}>Description</Text>
                <Text style={styles.headerCell}>Actions</Text>
            </View>
        );
    };

    const renderRow = (item: any, isLast: boolean) => {
        return (
            <View style={[styles.row, isLast && styles.lastRow]} key={item.id}>
                <Text style={styles.cell}>{item.title}</Text>
                <Text style={styles.cell}>{item.category}</Text>
                <Text style={styles.cell}>{item.timeframe}</Text>
                <Text style={styles.cell}>{item.impact}</Text>
                <Text style={styles.cell}>{item.descr}</Text>
                <View style={styles.actionsCell}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Image 
                            source={require('../assets/images/edit_icon.png')}
                            style={styles.actionIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Image 
                            source={require('../assets/images/delete_icon.png')}
                            style={styles.actionIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // Sample data
    const data = [
        {
            id: 1,
            title: "Circular Economy",
            category: "Technology",
            timeframe: "3-5 years",
            impact: "High",
            descr:"Descr",
            actions: "Delete"
        },
        {
            id: 2,
            title: "Artificial Intelligence",
            category: "Technology",
            timeframe: "5-10 years",
            impact: "Very High",
            descr:"Descr",
            actions: "Delete"
        },
        {
            id: 3,
            title: "Cybersecurity",
            category: "Technology",
            timeframe: "5-10 years",
            impact: "High",
            descr:"Descr",
            actions: "Delete"
        }
    ];

    return (
        <View style={styles.container}>
            {renderHeader()}
            {data.map((item, index) => renderRow(item, index === data.length - 1))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#FFF2DF',
        padding: 15,
        borderWidth:2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    row: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#FFFCF6',
        borderBottomWidth:2,
        borderLeftWidth:2,
        borderRightWidth:2,
        alignItems:'center'
    },
    lastRow: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#FFFCF6',
        borderBottomWidth:2,
        borderLeftWidth:2,
        borderRightWidth:2,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        alignItems:'center'
    },
    headerCell: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Aptos',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: 'black',
        fontFamily: 'Aptos',
    },
    actionsCell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    actionButton: {
        padding: 3,
    },
    actionIcon: {
        width: 20,
        height: 20,
    }
});

export default ManagementTable;