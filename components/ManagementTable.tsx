import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import trendsApi from '../apis/TrendsApi';
import { useNavigation } from '@react-navigation/native';

const ManagementTable = ({ trends }) => {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedTrend, setSelectedTrend] = useState<{ id: number; title: string } | null>(null);
    const navigation = useNavigation<NavigationProp>();

    const handleDeleteClick = (trend: { id: number; title: string }) => {
        setSelectedTrend(trend);
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        trendsApi.deleteTrend(selectedTrend.id);
        navigation.navigate('Manage Trends', {query: ''});
        setDeleteModalVisible(false);
        setSelectedTrend(null);
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
        setSelectedTrend(null);
    };

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
                <Text style={styles.cell} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cell} numberOfLines={1}>{item.trendType}</Text>
                <Text style={styles.cell} numberOfLines={1}>{item.timeFrame}</Text>
                <Text style={styles.cell} numberOfLines={1}>{item.impact}</Text>
                <Text style={styles.cell} numberOfLines={1}>{item.description}</Text>
                <View style={styles.actionsCell}>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Edit Trend', { trendId: item.id })}
                    >
                        <Image 
                            source={require('../assets/images/edit_icon.png')}
                            style={styles.actionIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleDeleteClick({ id: item.id, title: item.title })}
                    >
                        <Image 
                            source={require('../assets/images/delete_icon.png')}
                            style={styles.actionIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            {trends.map((item, index) => renderRow(item, index === trends.length - 1))}

            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={handleCancelDelete}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Are you sure you want to delete this trend?</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <Text style={styles.modalText}>
                                <Text style={styles.boldText}>"{selectedTrend?.title}"</Text>
                            </Text>
                            <Text style={styles.modalText}> 
                                This action cannot be undone.
                            </Text>
                            <View style={styles.modalButtons}>
                                <Pressable
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={handleCancelDelete}
                                >
                                    <View style={styles.buttonContent}>
                                        <Image 
                                            source={require('../assets/images/cancel_icon.png')}
                                            style={styles.buttonIcon}
                                        />
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </View>
                                </Pressable>
                                <Pressable
                                    style={[styles.modalButton, styles.deleteButton]}
                                    onPress={handleConfirmDelete}
                                >
                                    <View style={styles.buttonContent}>
                                        <Image 
                                            source={require('../assets/images/delete_icon.png')}
                                            style={styles.buttonIcon}
                                        />
                                        <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
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
        alignItems:'center',
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
        width: 100,
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
        maxWidth: 400,
        borderWidth: 2,
        borderColor: 'black',
        overflow: 'hidden',
    },
    modalHeader: {
        backgroundColor: '#FFF2DF',
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    modalBody: {
        padding: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Aptos',
        color: 'black',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Aptos',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 5,
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 2,
        width: 110,
    },
    cancelButton: {
        backgroundColor: '#9ECEE3',
        borderColor: 'black',
    },
    deleteButton: {
        backgroundColor: '#FFB469',
        borderColor: 'black',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Aptos',
        fontWeight: 'bold',
    },
    deleteButtonText: {
        color: 'black',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonIcon: {
        width: 20,
        height: 20,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default ManagementTable;