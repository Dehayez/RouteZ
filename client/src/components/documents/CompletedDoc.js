import React from 'react';
import { Document, Page, Text, Image, StyleSheet, Font, View } from '@react-pdf/renderer';

// Time
import moment from 'moment';
import 'moment/locale/nl-be';

Font.register({
  family: "Montserrat",
  src: "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
});

Font.register({
  family: "Playfair",
  src: "http://fonts.gstatic.com/s/playfairdisplaysc/v5/G0-tvBxd4eQRdwFKB8dRkXMiQ8bx8R67TKBblDxZ-bQ.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomStyle: "solid",
    borderBottomColor: "#4A84FC",
    borderBottomWidth: 0.5
  },
  completedDate: {
    fontFamily: "Montserrat",
    fontSize: 13,
  },
  completedText: {
    fontFamily: "Montserrat",
    fontWeight: "black",
    fontSize: 18,
  },
  completedContent: {
    fontFamily: "Montserrat",
    fontSize: 13,
    marginTop: 30,
  },
  logo: {
    height: 40,
  },
  content: {
    paddingTop: 30,
  }
});

const CompletedDoc = ({ moduleName, userName }) => {
  moment.locale('nl-be');

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.header}>
          <Image src="https://i.ibb.co/xXjZwd7/Route-Z-logo-color-single.png" style={styles.logo} />
          <Text style={styles.completedDate}>{moment(Date.now()).format('LL')}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.completedText}>
            Module {moduleName} volbracht
          </Text>
          <Text style={styles.completedContent}>
            Proficiat! {userName} heeft de module {moduleName} afgerond met succes. Dit document geld als een bewijs voor het vervolledigen van deze module.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default CompletedDoc;