//nodemon serve
//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const xml2js = require('xml2js');
const convert = require('xml-js');
const { response } = require('express');
var unirest = require('unirest');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept");
 next();
});

//Config .env
require('dotenv').config();


var rest = {};
const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});

app.get('/',(req,res)=>{
  res.send("API IS UP AND RUNNING !!");
});

//-----CUSTOMER PORTAL-------------

// LOGIN
app.post('/login',(req,res)=>{
  let id = req.body.id;
  let pwd = req.body.password;
  var loginBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCUSTOMERAUTH_FM>
        <CUSTOMERID>${id}</CUSTOMERID>
        <PASSWORD>${pwd}</PASSWORD>
     </urn:ZCUSTOMERAUTH_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Customer Login Call")
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_LOGIN&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(loginBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Customer login data');
      res.json({ success : false, message : "Check your credentials once"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZCUSTOMERAUTH_FM.Response"]

      if(result_body.STATUS == 'INVALID'){
        console.log('Unable to fetch Customer Login data');
        res.json({ success : false, message : "Check your credentials once"});
      }
      else{
        res.status(200).json({success : true, message : "User Authenticated Successfully", data: result_body});
      }
    }


  })

});

// profile
app.post('/profile',(req,res)=>{
  let id = req.body.id;
  var profileBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCUSTOMERPIPO_FM>
        <ID>${id}</ID>
        <STATUS>PROFILE</STATUS>
     </urn:ZCUSTOMERPIPO_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Customer Profile Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_CUSPIPO&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(profileBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Customer Profile data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZCUSTOMERPIPO_FM.Response"]

      if(result_body.CUSTOMERADDRESS['CUSTOMER'] === ''){
        console.log('Unable to fetch Customer profile data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body.CUSTOMERADDRESS});
      }
  }

  })

});


// SALE ORDER
app.post('/saleorder',(req,res)=>{
  let id = req.body.id;
  var saleorderBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCUSTOMERSALEORDER_FM>
        <CUSTOMERID>${id}</CUSTOMERID>
        <SALESORG>0001</SALESORG>
     </urn:ZCUSTOMERSALEORDER_FM>
  </soapenv:Body>
</soapenv:Envelope>
`;
  console.log("Saleorder Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_SALEORDER&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(saleorderBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZCUSTOMERSALEORDER_FM.Response"]
      if(result_body.RESULT['TYPE'] === 'E'){
        console.log('Unable to fetch data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }
    }

  })

});

//CREDIT
app.post('/creditdebitmemo',(req,res)=>{
  let id = req.body.id;
  var creditdebitBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCUSTOMERPIPO_FM>
        <ID>${id}</ID>
        <STATUS>CRED</STATUS>
     </urn:ZCUSTOMERPIPO_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Credit Debit Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_CUSPIPO&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(creditdebitBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZCUSTOMERPIPO_FM.Response"]

          if(result_body.CREDITRETURN === 'FAIL' && result_body.DEBITRETURN === 'FAIL'){
          console.log('Unable to fetch data');
          res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }
  }

  })

});

//DELIVERY LIST
app.post('/deliverylist',(req,res)=>{
  let id = req.body.id;
  var deliverylistBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCUSTOMERPIPO_FM>
        <ID>${id}</ID>
        <STATUS>DEL</STATUS>
     </urn:ZCUSTOMERPIPO_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Deliverylist Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_CUSPIPO&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(deliverylistBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else {
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZCUSTOMERPIPO_FM.Response"]
      if(Object.keys(result_body.DELIVERYDATA).length === 0){
        console.log('Unable to fetch data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }
    }

  })

});

//delivery detail

//INQUIRY LIST
app.post('/inquirylist',(req,res)=>{
  let id = req.body.id;
  var inquirylistBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCUSTOMERPIPO_FM>
        <ID>${id}</ID>
        <STATUS>INQ</STATUS>
     </urn:ZCUSTOMERPIPO_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Inquirylist Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_CUSPIPO&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(inquirylistBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZCUSTOMERPIPO_FM.Response"]
      if(Object.keys(result_body.INQUIRYLIST).length === 0){
        console.log('Unable to fetch data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }
    }

  })

});

//INVOICE
app.post('/invoice',(req,res)=>{
  let id = req.body.id;
  var invoiceBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCUSTOMERINVOICELIST_FM>
        <CUSTOMERID>${id}</CUSTOMERID>
        <SALESDOCUMENTNUM></SALESDOCUMENTNUM>
     </urn:ZCUSTOMERINVOICELIST_FM>
  </soapenv:Body>
</soapenv:Envelope>
`;
  console.log("Customer Invoice Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_INVOICELIST&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(invoiceBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Customer Invoice data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZCUSTOMERINVOICELIST_FM.Response"]
      if(result_body.RETURN === "0"){
        console.log('Unable to fetch Customer Invoice data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }
  }

  })

});

//-----VENDOR PORTAL-------------

//VENDOR LOGIN*
app.post('/vendorlogin',(req,res)=>{
  let id = req.body.id;
  let pwd = req.body.password;
  var loginBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZVENDORLOGIN_FM>
        <PASSWORD>${pwd}</PASSWORD>
        <VENDORID>${id}</VENDORID>
     </urn:ZVENDORLOGIN_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Vendor Login Call")
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_VENDORLOGIN&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(loginBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch vendor login data');
      res.json({ success : false, message : "Check your credentials once"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZVENDORLOGIN_FM.Response"]

      if(result_body.RESULT === 'FALSE' || result_body.RESULT=== ""){
        console.log('Unable to fetch vendor login data');
        res.json({ success : false, message : "Check your credentials once"});
      }
      else{
        res.status(200).json({success : true, message : "User Authenticated Successfully", data: result_body});
      }

    }



  })

});

// VENDOR profile*
app.post('/vendorprofile',(req,res)=>{
  let id = req.body.id;
  var profileBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZVENDORPROFILE_FM>
        <VENDORID>${id}</VENDORID>
     </urn:ZVENDORPROFILE_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Vendor Profile Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_VENDORPROFILE&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(profileBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Profile data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZVENDORPROFILE_FM.Response"]
      if(result_body.PROFILE['VENDOR'] === ''){
        console.log('Unable to fetch Profile data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }
    }



  })

});

//VENDOR INVOICE LIST*
app.post('/vendorinvoicelist',(req,res)=>{
  let id = req.body.id;
  var invoiceBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZPIPO_FM>
        <EMPID></EMPID>
        <ID>${id}</ID>
        <PS_PDF></PS_PDF>
        <STATUS>VENINV</STATUS>
     </urn:ZPIPO_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Vendor Invoice List Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_EMPLOYEE&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(invoiceBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor Invoice List data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZPIPO_FM.Response"]
      if(Object.keys(result_body.INVOICE).length === 0 ){
        console.log('Unable to fetch Vendor Invoice List data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }

    }


  })

});


//VENDOR GOODS RECEIPT*
app.post('/vendorgoodsreceipt',(req,res)=>{
  let id = req.body.id;
  var goodsreceiptBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZGOODSRECEIPT_FM>
        <VENDORID>${id}</VENDORID>
     </urn:ZGOODSRECEIPT_FM>
  </soapenv:Body>
</soapenv:Envelope>
`;
  console.log("Vendor Goods Receipt List Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_VGOODSRECEIPT&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(goodsreceiptBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor Goods receipt data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZGOODSRECEIPT_FM.Response"]
      if(Object.keys(result_body.GOODSHEAD).length === 0  && Object.keys(result_body.GOODSVALUE).length === 0 ){
        console.log('Unable to fetch Vendor Goods receipt  data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }

    }


  })

});

//VENDOR PAYMENT*
app.post('/vendorpayment',(req,res)=>{
  let id = req.body.id;
  var vendorpaymentBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZPAYMENT_FM>
        <!--You may enter the following 6 items in any order-->

        <COMPANYCODE>0001</COMPANYCODE>

        <DATETO></DATETO>

        <FROMDATE></FROMDATE>
        <VENDORID>${id}</VENDORID>
        <T_CLOSE>
           <!--Zero or more repetitions:-->
           <item>

              <COMP_CODE></COMP_CODE>

              <VENDOR></VENDOR>

              <SP_GL_IND></SP_GL_IND>

              <CLEAR_DATE></CLEAR_DATE>

              <CLR_DOC_NO></CLR_DOC_NO>

              <ALLOC_NMBR></ALLOC_NMBR>

              <FISC_YEAR></FISC_YEAR>

              <DOC_NO></DOC_NO>

              <ITEM_NUM></ITEM_NUM>

              <PSTNG_DATE></PSTNG_DATE>

              <DOC_DATE></DOC_DATE>

              <ENTRY_DATE></ENTRY_DATE>

              <CURRENCY></CURRENCY>

              <LOC_CURRCY></LOC_CURRCY>

              <REF_DOC_NO></REF_DOC_NO>

              <DOC_TYPE></DOC_TYPE>

              <FIS_PERIOD></FIS_PERIOD>

              <POST_KEY></POST_KEY>

              <DB_CR_IND></DB_CR_IND>

              <BUS_AREA></BUS_AREA>

              <TAX_CODE></TAX_CODE>

              <LC_AMOUNT></LC_AMOUNT>

              <AMT_DOCCUR></AMT_DOCCUR>

              <LC_TAX></LC_TAX>

              <TX_DOC_CUR></TX_DOC_CUR>

              <ITEM_TEXT></ITEM_TEXT>

              <BRANCH></BRANCH>

              <BLINE_DATE></BLINE_DATE>

              <PMNTTRMS></PMNTTRMS>

              <DSCT_DAYS1></DSCT_DAYS1>

              <DSCT_DAYS2></DSCT_DAYS2>

              <NETTERMS></NETTERMS>

              <DSCT_PCT1></DSCT_PCT1>

              <DSCT_PCT2></DSCT_PCT2>

              <DISC_BASE></DISC_BASE>

              <DSC_AMT_LC></DSC_AMT_LC>

              <DSC_AMT_DC></DSC_AMT_DC>

              <PYMT_METH></PYMT_METH>

              <PMNT_BLOCK></PMNT_BLOCK>

              <FIXEDTERMS></FIXEDTERMS>

              <INV_REF></INV_REF>

              <INV_YEAR></INV_YEAR>

              <INV_ITEM></INV_ITEM>

              <DUNN_BLOCK></DUNN_BLOCK>

              <DUNN_KEY></DUNN_KEY>

              <LAST_DUNN></LAST_DUNN>

              <DUNN_LEVEL></DUNN_LEVEL>

              <DUNN_AREA></DUNN_AREA>

              <W_TAX_CODE></W_TAX_CODE>

              <W_TAX_BASE></W_TAX_BASE>

              <WI_TAX_AMT></WI_TAX_AMT>

              <DOC_STATUS></DOC_STATUS>

              <NXT_DOCTYP></NXT_DOCTYP>

              <VAT_REG_NO></VAT_REG_NO>

              <EXEMPT_NO></EXEMPT_NO>

              <W_TAX_EXPT></W_TAX_EXPT>

              <REASON_CDE></REASON_CDE>

              <PMTMTHSUPL></PMTMTHSUPL>

              <REF_KEY_1></REF_KEY_1>

              <REF_KEY_2></REF_KEY_2>

              <T_CURRENCY></T_CURRENCY>

              <AMOUNT></AMOUNT>

              <NET_AMOUNT></NET_AMOUNT>

              <NAME></NAME>

              <NAME_2></NAME_2>

              <NAME_3></NAME_3>

              <NAME_4></NAME_4>

              <POSTL_CODE></POSTL_CODE>

              <CITY></CITY>

              <COUNTRY></COUNTRY>

              <STREET></STREET>

              <PO_BOX></PO_BOX>

              <POBX_PCD></POBX_PCD>

              <POBK_CURAC></POBK_CURAC>

              <BANK_ACCT></BANK_ACCT>

              <BANK_KEY></BANK_KEY>

              <BANK_CTRY></BANK_CTRY>

              <TAX_NO_1></TAX_NO_1>

              <TAX_NO_2></TAX_NO_2>

              <TAX></TAX>

              <EQUAL_TAX></EQUAL_TAX>

              <REGION></REGION>

              <CTRL_KEY></CTRL_KEY>

              <INSTR_KEY></INSTR_KEY>

              <PAYEE_CODE></PAYEE_CODE>

              <LANGU></LANGU>

              <BILL_LIFE></BILL_LIFE>

              <BE_TAXCODE></BE_TAXCODE>

              <BILLTAX_LC></BILLTAX_LC>

              <BILLTAX_FC></BILLTAX_FC>

              <LC_COL_CHG></LC_COL_CHG>

              <COLL_CHARG></COLL_CHARG>

              <CHGS_TX_CD></CHGS_TX_CD>

              <ISSUE_DATE></ISSUE_DATE>

              <USAGEDATE></USAGEDATE>

              <BILL_USAGE></BILL_USAGE>

              <DOMICILE></DOMICILE>

              <DRAWER></DRAWER>

              <CTRBNK_LOC></CTRBNK_LOC>

              <DRAW_CITY1></DRAW_CITY1>

              <DRAWEE></DRAWEE>

              <DRAW_CITY2></DRAW_CITY2>

              <DISCT_DAYS></DISCT_DAYS>

              <DISCT_RATE></DISCT_RATE>

              <ACCEPTED></ACCEPTED>

              <BILLSTATUS></BILLSTATUS>

              <PRTEST_IND></PRTEST_IND>

              <BE_DEMAND></BE_DEMAND>

              <OBJ_TYPE></OBJ_TYPE>

              <REF_DOC></REF_DOC>

              <REF_ORG_UN></REF_ORG_UN>

              <REVERSAL_DOC></REVERSAL_DOC>

              <SP_GL_TYPE></SP_GL_TYPE>

              <NEG_POSTNG></NEG_POSTNG>

              <REF_DOC_NO_LONG></REF_DOC_NO_LONG>
           </item>
        </T_CLOSE>
        <T_OPEN>
           <!--Zero or more repetitions:-->
           <item>

              <COMP_CODE></COMP_CODE>

              <VENDOR></VENDOR>

              <SP_GL_IND></SP_GL_IND>

              <CLEAR_DATE></CLEAR_DATE>

              <CLR_DOC_NO></CLR_DOC_NO>

              <ALLOC_NMBR></ALLOC_NMBR>

              <FISC_YEAR></FISC_YEAR>

              <DOC_NO></DOC_NO>

              <ITEM_NUM></ITEM_NUM>

              <PSTNG_DATE></PSTNG_DATE>

              <DOC_DATE></DOC_DATE>

              <ENTRY_DATE></ENTRY_DATE>

              <CURRENCY></CURRENCY>

              <LOC_CURRCY></LOC_CURRCY>

              <REF_DOC_NO></REF_DOC_NO>

              <DOC_TYPE></DOC_TYPE>

              <FIS_PERIOD></FIS_PERIOD>

              <POST_KEY></POST_KEY>

              <DB_CR_IND></DB_CR_IND>

              <BUS_AREA></BUS_AREA>

              <TAX_CODE></TAX_CODE>

              <LC_AMOUNT></LC_AMOUNT>

              <AMT_DOCCUR></AMT_DOCCUR>

              <LC_TAX></LC_TAX>

              <TX_DOC_CUR></TX_DOC_CUR>

              <ITEM_TEXT></ITEM_TEXT>

              <BRANCH></BRANCH>

              <BLINE_DATE></BLINE_DATE>

              <PMNTTRMS></PMNTTRMS>

              <DSCT_DAYS1></DSCT_DAYS1>

              <DSCT_DAYS2></DSCT_DAYS2>

              <NETTERMS></NETTERMS>

              <DSCT_PCT1></DSCT_PCT1>

              <DSCT_PCT2></DSCT_PCT2>

              <DISC_BASE></DISC_BASE>

              <DSC_AMT_LC></DSC_AMT_LC>

              <DSC_AMT_DC></DSC_AMT_DC>

              <PYMT_METH></PYMT_METH>

              <PMNT_BLOCK></PMNT_BLOCK>

              <FIXEDTERMS></FIXEDTERMS>

              <INV_REF></INV_REF>

              <INV_YEAR></INV_YEAR>

              <INV_ITEM></INV_ITEM>

              <DUNN_BLOCK></DUNN_BLOCK>

              <DUNN_KEY></DUNN_KEY>

              <LAST_DUNN></LAST_DUNN>

              <DUNN_LEVEL></DUNN_LEVEL>

              <DUNN_AREA></DUNN_AREA>

              <W_TAX_CODE></W_TAX_CODE>

              <W_TAX_BASE></W_TAX_BASE>

              <WI_TAX_AMT></WI_TAX_AMT>

              <DOC_STATUS></DOC_STATUS>

              <NXT_DOCTYP></NXT_DOCTYP>

              <VAT_REG_NO></VAT_REG_NO>

              <EXEMPT_NO></EXEMPT_NO>

              <W_TAX_EXPT></W_TAX_EXPT>

              <REASON_CDE></REASON_CDE>

              <PMTMTHSUPL></PMTMTHSUPL>

              <REF_KEY_1></REF_KEY_1>

              <REF_KEY_2></REF_KEY_2>

              <T_CURRENCY></T_CURRENCY>

              <AMOUNT></AMOUNT>

              <NET_AMOUNT></NET_AMOUNT>

              <NAME></NAME>

              <NAME_2></NAME_2>

              <NAME_3></NAME_3>

              <NAME_4></NAME_4>

              <POSTL_CODE></POSTL_CODE>

              <CITY></CITY>

              <COUNTRY></COUNTRY>

              <STREET></STREET>

              <PO_BOX></PO_BOX>

              <POBX_PCD></POBX_PCD>

              <POBK_CURAC></POBK_CURAC>

              <BANK_ACCT></BANK_ACCT>

              <BANK_KEY></BANK_KEY>

              <BANK_CTRY></BANK_CTRY>

              <TAX_NO_1></TAX_NO_1>

              <TAX_NO_2></TAX_NO_2>

              <TAX></TAX>

              <EQUAL_TAX></EQUAL_TAX>

              <REGION></REGION>

              <CTRL_KEY></CTRL_KEY>

              <INSTR_KEY></INSTR_KEY>

              <PAYEE_CODE></PAYEE_CODE>

              <LANGU></LANGU>

              <BILL_LIFE></BILL_LIFE>

              <BE_TAXCODE></BE_TAXCODE>

              <BILLTAX_LC></BILLTAX_LC>

              <BILLTAX_FC></BILLTAX_FC>

              <LC_COL_CHG></LC_COL_CHG>

              <COLL_CHARG></COLL_CHARG>

              <CHGS_TX_CD></CHGS_TX_CD>

              <ISSUE_DATE></ISSUE_DATE>

              <USAGEDATE></USAGEDATE>

              <BILL_USAGE></BILL_USAGE>

              <DOMICILE></DOMICILE>

              <DRAWER></DRAWER>

              <CTRBNK_LOC></CTRBNK_LOC>

              <DRAW_CITY1></DRAW_CITY1>

              <DRAWEE></DRAWEE>

              <DRAW_CITY2></DRAW_CITY2>

              <DISCT_DAYS></DISCT_DAYS>

              <DISCT_RATE></DISCT_RATE>

              <ACCEPTED></ACCEPTED>

              <BILLSTATUS></BILLSTATUS>

              <PRTEST_IND></PRTEST_IND>

              <BE_DEMAND></BE_DEMAND>

              <OBJ_TYPE></OBJ_TYPE>

              <REF_DOC></REF_DOC>

              <REF_ORG_UN></REF_ORG_UN>

              <REVERSAL_DOC></REVERSAL_DOC>

              <SP_GL_TYPE></SP_GL_TYPE>

              <NEG_POSTNG></NEG_POSTNG>

              <REF_DOC_NO_LONG></REF_DOC_NO_LONG>
           </item>
        </T_OPEN>
     </urn:ZPAYMENT_FM>
  </soapenv:Body>
</soapenv:Envelope>
`;
  console.log("Vendor Payment List Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_VPAYMENT&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(vendorpaymentBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor Payment data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZPAYMENT_FM.Response"];
      if(Object.keys(result_body.T_CLOSE).length === 0 && Object.keys(result_body.T_OPEN).length === 0 ){
        console.log('Unable to fetch Vendor Payment  data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }

    }



  })

});

//VENDOR CREDIT DEBIT MEMO*
app.post('/vendorcreditdebit',(req,res)=>{
  let id = req.body.id;
  var vendorpurchaseorderBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCREDITDEBIT_FM>
        <VENDORID>${id}</VENDORID>
     </urn:ZCREDITDEBIT_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Vendor Credit & Debit List Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_VCREDITDEBIT&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(vendorpurchaseorderBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor Credit & Debit data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZCREDITDEBIT_FM.Response"]
      if(Object.keys(result_body.DEBITDATA).length === 0  && Object.keys(result_body.CREDITDATA).length === 0){
        console.log('Unable to fetch Vendor Credit & Debit  data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }
    }


  })

});

//VENDOR RFQ 5*
app.post('/vendorrfq',(req,res)=>{
  let id = req.body.id;
  var vendorrfqBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZVENDORRFQ_FM>
        <VENDORID>${id}</VENDORID>
        <RFQ_HEAD>

           <item>

              <PO_NUMBER></PO_NUMBER>

              <CO_CODE></CO_CODE>

              <DOC_CAT></DOC_CAT>

              <DOC_TYPE></DOC_TYPE>

              <CNTRL_IND></CNTRL_IND>

              <DELETE_IND></DELETE_IND>

              <STATUS></STATUS>

              <CREATED_ON></CREATED_ON>

              <CREATED_BY></CREATED_BY>

              <ITEM_INTVL></ITEM_INTVL>

              <LAST_ITEM></LAST_ITEM>

              <VENDOR></VENDOR>

              <LANGUAGE></LANGUAGE>

              <PMNTTRMS></PMNTTRMS>

              <DSCNT1_TO></DSCNT1_TO>

              <DSCNT2_TO></DSCNT2_TO>

              <DSCNT3_TO></DSCNT3_TO>

              <CASH_DISC1></CASH_DISC1>

              <CASH_DISC2></CASH_DISC2>

              <PURCH_ORG></PURCH_ORG>

              <PUR_GROUP></PUR_GROUP>

              <CURRENCY></CURRENCY>

              <EXCH_RATE></EXCH_RATE>

              <EX_RATE_FX></EX_RATE_FX>

              <DOC_DATE></DOC_DATE>

              <VPER_START></VPER_START>

              <VPER_END></VPER_END>

              <APPLIC_BY></APPLIC_BY>

              <QUOT_DEAD></QUOT_DEAD>

              <BINDG_PER></BINDG_PER>

              <WARRANTY></WARRANTY>

              <BIDINV_NO></BIDINV_NO>

              <QUOTATION></QUOTATION>

              <QUOT_DATE></QUOT_DATE>

              <REF_1></REF_1>

              <SALES_PERS></SALES_PERS>

              <TELEPHONE></TELEPHONE>

              <SUPPL_VEND></SUPPL_VEND>

              <CUSTOMER></CUSTOMER>

              <AGREEMENT></AGREEMENT>

              <REJ_REASON></REJ_REASON>

              <COMPL_DLV></COMPL_DLV>

              <GR_MESSAGE></GR_MESSAGE>

              <SUPPL_PLNT></SUPPL_PLNT>

              <RCVG_VEND></RCVG_VEND>

              <INCOTERMS1></INCOTERMS1>

              <INCOTERMS2></INCOTERMS2>

              <TARGET_VAL></TARGET_VAL>

              <COLL_NO></COLL_NO>

              <DOC_COND></DOC_COND>

              <PROCEDURE></PROCEDURE>

              <UPDATE_GRP></UPDATE_GRP>

              <DIFF_INV></DIFF_INV>

              <EXPORT_NO></EXPORT_NO>

              <OUR_REF></OUR_REF>

              <LOGSYSTEM></LOGSYSTEM>

              <SUBITEMINT></SUBITEMINT>

              <MAST_COND></MAST_COND>

              <REL_GROUP></REL_GROUP>

              <REL_STRAT></REL_STRAT>

              <REL_IND></REL_IND>

              <REL_STATUS></REL_STATUS>

              <SUBJ_TO_R></SUBJ_TO_R>

              <TAXR_CNTRY></TAXR_CNTRY>

              <SCHED_IND></SCHED_IND>

              <VEND_NAME></VEND_NAME>

              <CURRENCY_ISO></CURRENCY_ISO>

              <EXCH_RATE_CM></EXCH_RATE_CM>

              <HOLD></HOLD>
           </item>
        </RFQ_HEAD>
        <RFQ_VALUES>
           <!--Zero or more repetitions:-->
           <item>

              <PO_NUMBER></PO_NUMBER>

              <PO_ITEM></PO_ITEM>

              <DELETE_IND></DELETE_IND>

              <STATUS></STATUS>

              <CHANGED_ON></CHANGED_ON>

              <SHORT_TEXT></SHORT_TEXT>

              <MATERIAL></MATERIAL>

              <PUR_MAT></PUR_MAT>

              <CO_CODE></CO_CODE>

              <PLANT></PLANT>

              <STORE_LOC></STORE_LOC>

              <TRACKINGNO></TRACKINGNO>

              <MAT_GRP></MAT_GRP>

              <INFO_REC></INFO_REC>

              <VEND_MAT></VEND_MAT>

              <TARGET_QTY></TARGET_QTY>

              <QUANTITY></QUANTITY>

              <UNIT></UNIT>

              <ORDERPR_UN></ORDERPR_UN>

              <CONV_NUM1></CONV_NUM1>

              <CONV_DEN1></CONV_DEN1>

              <CONV_NUM2></CONV_NUM2>

              <CONV_DEN2></CONV_DEN2>

              <NET_PRICE></NET_PRICE>

              <PRICE_UNIT></PRICE_UNIT>

              <NET_VALUE></NET_VALUE>

              <GROS_VALUE></GROS_VALUE>

              <QUOT_DEAD></QUOT_DEAD>

              <GR_PR_TIME></GR_PR_TIME>

              <TAX_CODE></TAX_CODE>

              <SETT_GRP1></SETT_GRP1>

              <QUAL_INSP></QUAL_INSP>

              <INFO_UPD></INFO_UPD>

              <PRNT_PRICE></PRNT_PRICE>

              <EST_PRICE></EST_PRICE>

              <NUM_REMIND></NUM_REMIND>

              <REMINDER1></REMINDER1>

              <REMINDER2></REMINDER2>

              <REMINDER3></REMINDER3>

              <OVERDELTOL></OVERDELTOL>

              <UNLIMITED></UNLIMITED>

              <UNDER_TOL></UNDER_TOL>

              <VAL_TYPE></VAL_TYPE>

              <VAL_CAT></VAL_CAT>

              <REJ_IND></REJ_IND>

              <COMMENT></COMMENT>

              <DEL_COMPL></DEL_COMPL>

              <FINAL_INV></FINAL_INV>

              <ITEM_CAT></ITEM_CAT>

              <ACCTASSCAT></ACCTASSCAT>

              <CONSUMPT></CONSUMPT>

              <DISTRIB></DISTRIB>

              <PART_INV></PART_INV>

              <GR_IND></GR_IND>

              <GR_NON_VAL></GR_NON_VAL>

              <IR_IND></IR_IND>

              <GR_BASEDIV></GR_BASEDIV>

              <ACKN_REQD></ACKN_REQD>

              <ACKNOWL_NO></ACKNOWL_NO>

              <AGREEMENT></AGREEMENT>

              <AGMT_ITEM></AGMT_ITEM>

              <RECON_DATE></RECON_DATE>

              <AGRCUMQTY></AGRCUMQTY>

              <FIRM_ZONE></FIRM_ZONE>

              <TRADE_OFF></TRADE_OFF>

              <BOM_EXPL></BOM_EXPL>

              <EXCLUSION></EXCLUSION>

              <BASE_UNIT></BASE_UNIT>

              <SHIPPING></SHIPPING>

              <OUTL_TARGV></OUTL_TARGV>

              <NOND_ITAX></NOND_ITAX>

              <RELORD_QTY></RELORD_QTY>

              <PRICE_DATE></PRICE_DATE>

              <DOC_CAT></DOC_CAT>

              <EFF_VALUE></EFF_VALUE>

              <COMMITMENT></COMMITMENT>

              <CUSTOMER></CUSTOMER>

              <ADDRESS></ADDRESS>

              <COND_GROUP></COND_GROUP>

              <NO_C_DISC></NO_C_DISC>

              <UPDATE_GRP></UPDATE_GRP>

              <PLAN_DEL></PLAN_DEL>

              <NET_WEIGHT></NET_WEIGHT>

              <WEIGHTUNIT></WEIGHTUNIT>

              <TAX_JUR_CD></TAX_JUR_CD>

              <PRINT_REL></PRINT_REL>

              <SPEC_STOCK></SPEC_STOCK>

              <SETRESERNO></SETRESERNO>

              <SETTLITMNO></SETTLITMNO>

              <NOT_CHGBL></NOT_CHGBL>

              <CTR_KEY_QM></CTR_KEY_QM>

              <CERT_TYPE></CERT_TYPE>

              <EAN_UPC></EAN_UPC>

              <CONF_CTRL></CONF_CTRL>

              <REV_LEV></REV_LEV>

              <FUND></FUND>

              <FUNDS_CTR></FUNDS_CTR>

              <CMMT_ITEM></CMMT_ITEM>

              <BA_PARTNER></BA_PARTNER>

              <PTR_ASS_BA></PTR_ASS_BA>

              <PROFIT_CTR></PROFIT_CTR>

              <PARTNER_PC></PARTNER_PC>

              <PRICE_CTR></PRICE_CTR>

              <GROSS_WGHT></GROSS_WGHT>

              <VOLUME></VOLUME>

              <VOLUMEUNIT></VOLUMEUNIT>

              <INCOTERMS1></INCOTERMS1>

              <INCOTERMS2></INCOTERMS2>

              <ADVANCE></ADVANCE>

              <PRIOR_VEND></PRIOR_VEND>

              <SUB_RANGE></SUB_RANGE>

              <PCKG_NO></PCKG_NO>

              <STATISTIC></STATISTIC>

              <HL_ITEM></HL_ITEM>

              <GR_TO_DATE></GR_TO_DATE>

              <SUPPL_VEND></SUPPL_VEND>

              <SC_VENDOR></SC_VENDOR>

              <CONF_MATL></CONF_MATL>

              <MAT_CAT></MAT_CAT>

              <KANBAN_IND></KANBAN_IND>

              <ADDRESS2></ADDRESS2>

              <INT_OBJ_NO></INT_OBJ_NO>

              <ERS></ERS>

              <GRSETTFROM></GRSETTFROM>

              <LAST_TRANS></LAST_TRANS>

              <TRANS_TIME></TRANS_TIME>

              <SER_NO></SER_NO>

              <PROMOTION></PROMOTION>

              <ALLOC_TBL></ALLOC_TBL>

              <AT_ITEM></AT_ITEM>

              <POINTS></POINTS>

              <POINTS_UN></POINTS_UN>

              <SEASON_TY></SEASON_TY>

              <SEASON_YR></SEASON_YR>

              <SETT_GRP_2></SETT_GRP_2>

              <SETT_GRP_3></SETT_GRP_3>

              <SETT_ITEM></SETT_ITEM>

              <ML_AKT></ML_AKT>

              <REMSHLIFE></REMSHLIFE>

              <RFQ></RFQ>

              <RFQ_ITEM></RFQ_ITEM>

              <CONFIG_ORG></CONFIG_ORG>

              <QUOTAUSAGE></QUOTAUSAGE>

              <SPSTCK_PHY></SPSTCK_PHY>

              <PREQ_NO></PREQ_NO>

              <PREQ_ITEM></PREQ_ITEM>

              <MAT_TYPE></MAT_TYPE>

              <SI_CAT></SI_CAT>

              <SUB_ITEMS></SUB_ITEMS>

              <SUBTOTAL_1></SUBTOTAL_1>

              <SUBTOTAL_2></SUBTOTAL_2>

              <SUBTOTAL_3></SUBTOTAL_3>

              <SUBTOTAL_4></SUBTOTAL_4>

              <SUBTOTAL_5></SUBTOTAL_5>

              <SUBTOTAL_6></SUBTOTAL_6>

              <SUBITM_KEY></SUBITM_KEY>

              <MAX_CMG></MAX_CMG>

              <MAX_CPGO></MAX_CPGO>

              <RET_ITEM></RET_ITEM>

              <AT_RELEV></AT_RELEV>

              <ORD_REAS></ORD_REAS>

              <DEL_TYP_RT></DEL_TYP_RT>

              <PRDTE_CTRL></PRDTE_CTRL>

              <MANUF_PROF></MANUF_PROF>

              <MANU_MAT></MANU_MAT>

              <MFR_NO></MFR_NO>

              <MFR_NO_EXT></MFR_NO_EXT>

              <ITEM_CAT_EXT></ITEM_CAT_EXT>

              <PO_UNIT_ISO></PO_UNIT_ISO>

              <ORDERPR_UN_ISO></ORDERPR_UN_ISO>

              <BASE_UOM_ISO></BASE_UOM_ISO>

              <WEIGHTUNIT_ISO></WEIGHTUNIT_ISO>

              <VOLUMEUNIT_ISO></VOLUMEUNIT_ISO>

              <POINTS_UN_ISO></POINTS_UN_ISO>

              <CONF_MATL_EXTERNAL></CONF_MATL_EXTERNAL>

              <CONF_MATL_GUID></CONF_MATL_GUID>

              <CONF_MATL_VERSION></CONF_MATL_VERSION>

              <MATERIAL_EXTERNAL></MATERIAL_EXTERNAL>

              <MATERIAL_GUID></MATERIAL_GUID>

              <MATERIAL_VERSION></MATERIAL_VERSION>

              <PUR_MAT_EXTERNAL></PUR_MAT_EXTERNAL>

              <PUR_MAT_GUID></PUR_MAT_GUID>

              <PUR_MAT_VERSION></PUR_MAT_VERSION>

              <GRANT_NBR></GRANT_NBR>

              <CMMT_ITEM_LONG></CMMT_ITEM_LONG>

              <FUNC_AREA_LONG></FUNC_AREA_LONG>

              <BUDGET_PERIOD></BUDGET_PERIOD>

              <MATERIAL_LONG></MATERIAL_LONG>

              <PUR_MAT_LONG></PUR_MAT_LONG>
              <CONF_MATL_LONG></CONF_MATL_LONG>
           </item>
        </RFQ_VALUES>
     </urn:ZVENDORRFQ_FM>
  </soapenv:Body>
</soapenv:Envelope>
`;
  console.log("Vendor RFQ Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_VENDORRFQ&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(vendorrfqBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor RFQ data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZVENDORRFQ_FM.Response"]
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
    }
  })

});

//VENDOR PURCHASE ORDER*
app.post('/vendorpo',(req,res)=>{
  let id = req.body.id;
  var vendorpoBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZPURCHASEORDER_FM>
        <VENDORID>${id}</VENDORID>
        <HEADERDATA>

           <item>

              <PO_NUMBER></PO_NUMBER>

              <CO_CODE></CO_CODE>

              <DOC_CAT></DOC_CAT>

              <DOC_TYPE></DOC_TYPE>

              <CNTRL_IND></CNTRL_IND>

              <DELETE_IND></DELETE_IND>

              <STATUS></STATUS>

              <CREATED_ON></CREATED_ON>

              <CREATED_BY></CREATED_BY>

              <ITEM_INTVL></ITEM_INTVL>

              <LAST_ITEM></LAST_ITEM>

              <VENDOR></VENDOR>

              <LANGUAGE></LANGUAGE>

              <PMNTTRMS></PMNTTRMS>

              <DSCNT1_TO></DSCNT1_TO>

              <DSCNT2_TO></DSCNT2_TO>

              <DSCNT3_TO></DSCNT3_TO>

              <CASH_DISC1></CASH_DISC1>

              <CASH_DISC2></CASH_DISC2>

              <PURCH_ORG></PURCH_ORG>

              <PUR_GROUP></PUR_GROUP>

              <CURRENCY></CURRENCY>

              <EXCH_RATE></EXCH_RATE>

              <EX_RATE_FX></EX_RATE_FX>

              <DOC_DATE></DOC_DATE>

              <VPER_START></VPER_START>

              <VPER_END></VPER_END>

              <APPLIC_BY></APPLIC_BY>

              <QUOT_DEAD></QUOT_DEAD>

              <BINDG_PER></BINDG_PER>

              <WARRANTY></WARRANTY>

              <BIDINV_NO></BIDINV_NO>

              <QUOTATION></QUOTATION>

              <QUOT_DATE></QUOT_DATE>

              <REF_1></REF_1>

              <SALES_PERS></SALES_PERS>

              <TELEPHONE></TELEPHONE>

              <SUPPL_VEND></SUPPL_VEND>

              <CUSTOMER></CUSTOMER>

              <AGREEMENT></AGREEMENT>

              <REJ_REASON></REJ_REASON>

              <COMPL_DLV></COMPL_DLV>

              <GR_MESSAGE></GR_MESSAGE>

              <SUPPL_PLNT></SUPPL_PLNT>

              <RCVG_VEND></RCVG_VEND>

              <INCOTERMS1></INCOTERMS1>

              <INCOTERMS2></INCOTERMS2>

              <TARGET_VAL></TARGET_VAL>

              <COLL_NO></COLL_NO>

              <DOC_COND></DOC_COND>

              <PROCEDURE></PROCEDURE>

              <UPDATE_GRP></UPDATE_GRP>

              <DIFF_INV></DIFF_INV>

              <EXPORT_NO></EXPORT_NO>

              <OUR_REF></OUR_REF>

              <LOGSYSTEM></LOGSYSTEM>

              <SUBITEMINT></SUBITEMINT>

              <MAST_COND></MAST_COND>

              <REL_GROUP></REL_GROUP>

              <REL_STRAT></REL_STRAT>

              <REL_IND></REL_IND>

              <REL_STATUS></REL_STATUS>

              <SUBJ_TO_R></SUBJ_TO_R>

              <TAXR_CNTRY></TAXR_CNTRY>

              <SCHED_IND></SCHED_IND>

              <VEND_NAME></VEND_NAME>

              <CURRENCY_ISO></CURRENCY_ISO>

              <EXCH_RATE_CM></EXCH_RATE_CM>

              <HOLD></HOLD>
           </item>
        </HEADERDATA>
        <ITEMDATA>
           <!--Zero or more repetitions:-->
           <item>

              <PO_NUMBER></PO_NUMBER>

              <PO_ITEM></PO_ITEM>

              <DELETE_IND></DELETE_IND>

              <STATUS></STATUS>

              <CHANGED_ON></CHANGED_ON>

              <SHORT_TEXT></SHORT_TEXT>

              <MATERIAL></MATERIAL>

              <PUR_MAT></PUR_MAT>

              <CO_CODE></CO_CODE>

              <PLANT></PLANT>

              <STORE_LOC></STORE_LOC>

              <TRACKINGNO></TRACKINGNO>

              <MAT_GRP></MAT_GRP>

              <INFO_REC></INFO_REC>

              <VEND_MAT></VEND_MAT>

              <TARGET_QTY></TARGET_QTY>

              <QUANTITY></QUANTITY>

              <UNIT></UNIT>

              <ORDERPR_UN></ORDERPR_UN>

              <CONV_NUM1></CONV_NUM1>

              <CONV_DEN1></CONV_DEN1>

              <CONV_NUM2></CONV_NUM2>

              <CONV_DEN2></CONV_DEN2>

              <NET_PRICE></NET_PRICE>

              <PRICE_UNIT></PRICE_UNIT>

              <NET_VALUE></NET_VALUE>

              <GROS_VALUE></GROS_VALUE>

              <QUOT_DEAD></QUOT_DEAD>

              <GR_PR_TIME></GR_PR_TIME>

              <TAX_CODE></TAX_CODE>

              <SETT_GRP1></SETT_GRP1>

              <QUAL_INSP></QUAL_INSP>

              <INFO_UPD></INFO_UPD>

              <PRNT_PRICE></PRNT_PRICE>

              <EST_PRICE></EST_PRICE>

              <NUM_REMIND></NUM_REMIND>

              <REMINDER1></REMINDER1>

              <REMINDER2></REMINDER2>

              <REMINDER3></REMINDER3>

              <OVERDELTOL></OVERDELTOL>

              <UNLIMITED></UNLIMITED>

              <UNDER_TOL></UNDER_TOL>

              <VAL_TYPE></VAL_TYPE>

              <VAL_CAT></VAL_CAT>

              <REJ_IND></REJ_IND>

              <COMMENT></COMMENT>

              <DEL_COMPL></DEL_COMPL>

              <FINAL_INV></FINAL_INV>

              <ITEM_CAT></ITEM_CAT>

              <ACCTASSCAT></ACCTASSCAT>

              <CONSUMPT></CONSUMPT>

              <DISTRIB></DISTRIB>

              <PART_INV></PART_INV>

              <GR_IND></GR_IND>

              <GR_NON_VAL></GR_NON_VAL>

              <IR_IND></IR_IND>

              <GR_BASEDIV></GR_BASEDIV>

              <ACKN_REQD></ACKN_REQD>

              <ACKNOWL_NO></ACKNOWL_NO>

              <AGREEMENT></AGREEMENT>

              <AGMT_ITEM></AGMT_ITEM>

              <RECON_DATE></RECON_DATE>

              <AGRCUMQTY></AGRCUMQTY>

              <FIRM_ZONE></FIRM_ZONE>

              <TRADE_OFF></TRADE_OFF>

              <BOM_EXPL></BOM_EXPL>

              <EXCLUSION></EXCLUSION>

              <BASE_UNIT></BASE_UNIT>

              <SHIPPING></SHIPPING>

              <OUTL_TARGV></OUTL_TARGV>

              <NOND_ITAX></NOND_ITAX>

              <RELORD_QTY></RELORD_QTY>

              <PRICE_DATE></PRICE_DATE>

              <DOC_CAT></DOC_CAT>

              <EFF_VALUE></EFF_VALUE>

              <COMMITMENT></COMMITMENT>

              <CUSTOMER></CUSTOMER>

              <ADDRESS></ADDRESS>

              <COND_GROUP></COND_GROUP>

              <NO_C_DISC></NO_C_DISC>

              <UPDATE_GRP></UPDATE_GRP>

              <PLAN_DEL></PLAN_DEL>

              <NET_WEIGHT></NET_WEIGHT>

              <WEIGHTUNIT></WEIGHTUNIT>

              <TAX_JUR_CD></TAX_JUR_CD>

              <PRINT_REL></PRINT_REL>

              <SPEC_STOCK></SPEC_STOCK>

              <SETRESERNO></SETRESERNO>

              <SETTLITMNO></SETTLITMNO>

              <NOT_CHGBL></NOT_CHGBL>

              <CTR_KEY_QM></CTR_KEY_QM>

              <CERT_TYPE></CERT_TYPE>

              <EAN_UPC></EAN_UPC>

              <CONF_CTRL></CONF_CTRL>

              <REV_LEV></REV_LEV>

              <FUND></FUND>

              <FUNDS_CTR></FUNDS_CTR>

              <CMMT_ITEM></CMMT_ITEM>

              <BA_PARTNER></BA_PARTNER>

              <PTR_ASS_BA></PTR_ASS_BA>

              <PROFIT_CTR></PROFIT_CTR>

              <PARTNER_PC></PARTNER_PC>

              <PRICE_CTR></PRICE_CTR>

              <GROSS_WGHT></GROSS_WGHT>

              <VOLUME></VOLUME>

              <VOLUMEUNIT></VOLUMEUNIT>

              <INCOTERMS1></INCOTERMS1>

              <INCOTERMS2></INCOTERMS2>

              <ADVANCE></ADVANCE>

              <PRIOR_VEND></PRIOR_VEND>

              <SUB_RANGE></SUB_RANGE>

              <PCKG_NO></PCKG_NO>

              <STATISTIC></STATISTIC>

              <HL_ITEM></HL_ITEM>

              <GR_TO_DATE></GR_TO_DATE>

              <SUPPL_VEND></SUPPL_VEND>

              <SC_VENDOR></SC_VENDOR>

              <CONF_MATL></CONF_MATL>

              <MAT_CAT></MAT_CAT>

              <KANBAN_IND></KANBAN_IND>

              <ADDRESS2></ADDRESS2>

              <INT_OBJ_NO></INT_OBJ_NO>

              <ERS></ERS>

              <GRSETTFROM></GRSETTFROM>

              <LAST_TRANS></LAST_TRANS>

              <TRANS_TIME></TRANS_TIME>

              <SER_NO></SER_NO>

              <PROMOTION></PROMOTION>

              <ALLOC_TBL></ALLOC_TBL>

              <AT_ITEM></AT_ITEM>

              <POINTS></POINTS>

              <POINTS_UN></POINTS_UN>

              <SEASON_TY></SEASON_TY>

              <SEASON_YR></SEASON_YR>

              <SETT_GRP_2></SETT_GRP_2>

              <SETT_GRP_3></SETT_GRP_3>

              <SETT_ITEM></SETT_ITEM>

              <ML_AKT></ML_AKT>

              <REMSHLIFE></REMSHLIFE>

              <RFQ></RFQ>

              <RFQ_ITEM></RFQ_ITEM>

              <CONFIG_ORG></CONFIG_ORG>

              <QUOTAUSAGE></QUOTAUSAGE>

              <SPSTCK_PHY></SPSTCK_PHY>

              <PREQ_NO></PREQ_NO>

              <PREQ_ITEM></PREQ_ITEM>

              <MAT_TYPE></MAT_TYPE>

              <SI_CAT></SI_CAT>

              <SUB_ITEMS></SUB_ITEMS>

              <SUBTOTAL_1></SUBTOTAL_1>

              <SUBTOTAL_2></SUBTOTAL_2>

              <SUBTOTAL_3></SUBTOTAL_3>

              <SUBTOTAL_4></SUBTOTAL_4>

              <SUBTOTAL_5></SUBTOTAL_5>

              <SUBTOTAL_6></SUBTOTAL_6>

              <SUBITM_KEY></SUBITM_KEY>

              <MAX_CMG></MAX_CMG>

              <MAX_CPGO></MAX_CPGO>

              <RET_ITEM></RET_ITEM>

              <AT_RELEV></AT_RELEV>

              <ORD_REAS></ORD_REAS>

              <DEL_TYP_RT></DEL_TYP_RT>

              <PRDTE_CTRL></PRDTE_CTRL>

              <MANUF_PROF></MANUF_PROF>

              <MANU_MAT></MANU_MAT>

              <MFR_NO></MFR_NO>

              <MFR_NO_EXT></MFR_NO_EXT>

              <ITEM_CAT_EXT></ITEM_CAT_EXT>

              <PO_UNIT_ISO></PO_UNIT_ISO>

              <ORDERPR_UN_ISO></ORDERPR_UN_ISO>

              <BASE_UOM_ISO></BASE_UOM_ISO>

              <WEIGHTUNIT_ISO></WEIGHTUNIT_ISO>

              <VOLUMEUNIT_ISO></VOLUMEUNIT_ISO>

              <POINTS_UN_ISO></POINTS_UN_ISO>

              <CONF_MATL_EXTERNAL></CONF_MATL_EXTERNAL>

              <CONF_MATL_GUID></CONF_MATL_GUID>

              <CONF_MATL_VERSION></CONF_MATL_VERSION>

              <MATERIAL_EXTERNAL></MATERIAL_EXTERNAL>

              <MATERIAL_GUID></MATERIAL_GUID>

              <MATERIAL_VERSION></MATERIAL_VERSION>

              <PUR_MAT_EXTERNAL></PUR_MAT_EXTERNAL>

              <PUR_MAT_GUID></PUR_MAT_GUID>

              <PUR_MAT_VERSION></PUR_MAT_VERSION>

              <GRANT_NBR></GRANT_NBR>

              <CMMT_ITEM_LONG></CMMT_ITEM_LONG>

              <FUNC_AREA_LONG></FUNC_AREA_LONG>

              <BUDGET_PERIOD></BUDGET_PERIOD>

              <MATERIAL_LONG></MATERIAL_LONG>

              <PUR_MAT_LONG></PUR_MAT_LONG>

              <CONF_MATL_LONG></CONF_MATL_LONG>
           </item>
        </ITEMDATA>
        <PURCHORDER>
           <!--Zero or more repetitions:-->
           <item>

              <MANDT></MANDT>

              <EBELN></EBELN>

              <EBELP></EBELP>

              <ZEKKN></ZEKKN>

              <VGABE></VGABE>

              <GJAHR></GJAHR>

              <BELNR></BELNR>

              <BUZEI></BUZEI>

              <BEWTP></BEWTP>

              <BWART></BWART>

              <BUDAT></BUDAT>

              <MENGE></MENGE>

              <BPMNG></BPMNG>

              <DMBTR></DMBTR>

              <WRBTR></WRBTR>

              <WAERS></WAERS>

              <AREWR></AREWR>

              <WESBS></WESBS>

              <BPWES></BPWES>

              <SHKZG></SHKZG>

              <BWTAR></BWTAR>

              <ELIKZ></ELIKZ>

              <XBLNR></XBLNR>

              <LFGJA></LFGJA>

              <LFBNR></LFBNR>

              <LFPOS></LFPOS>

              <GRUND></GRUND>

              <CPUDT></CPUDT>

              <CPUTM></CPUTM>

              <REEWR></REEWR>

              <EVERE></EVERE>

              <REFWR></REFWR>

              <MATNR></MATNR>

              <WERKS></WERKS>

              <XWSBR></XWSBR>

              <ETENS></ETENS>

              <KNUMV></KNUMV>

              <MWSKZ></MWSKZ>

              <LSMNG></LSMNG>

              <LSMEH></LSMEH>

              <EMATN></EMATN>

              <AREWW></AREWW>

              <HSWAE></HSWAE>

              <BAMNG></BAMNG>

              <CHARG></CHARG>

              <BLDAT></BLDAT>

              <XWOFF></XWOFF>

              <XUNPL></XUNPL>

              <ERNAM></ERNAM>

              <SRVPOS></SRVPOS>

              <PACKNO></PACKNO>

              <INTROW></INTROW>

              <BEKKN></BEKKN>

              <LEMIN></LEMIN>

              <AREWB></AREWB>

              <REWRB></REWRB>

              <SAPRL></SAPRL>

              <MENGE_POP></MENGE_POP>

              <BPMNG_POP></BPMNG_POP>

              <DMBTR_POP></DMBTR_POP>

              <WRBTR_POP></WRBTR_POP>

              <WESBB></WESBB>

              <BPWEB></BPWEB>

              <WEORA></WEORA>

              <AREWR_POP></AREWR_POP>

              <KUDIF></KUDIF>

              <RETAMT_FC></RETAMT_FC>

              <RETAMT_LC></RETAMT_LC>

              <RETAMTP_FC></RETAMTP_FC>

              <RETAMTP_LC></RETAMTP_LC>

              <XMACC></XMACC>

              <WKURS></WKURS>

              <INV_ITEM_ORIGIN></INV_ITEM_ORIGIN>

              <VBELN_ST></VBELN_ST>

              <VBELP_ST></VBELP_ST>

              <SGT_SCAT></SGT_SCAT>

              <ET_UPD></ET_UPD>

              <J_SC_DIE_COMP_F></J_SC_DIE_COMP_F>

              <FSH_SEASON_YEAR></FSH_SEASON_YEAR>

              <FSH_SEASON></FSH_SEASON>

              <FSH_COLLECTION></FSH_COLLECTION>

              <FSH_THEME></FSH_THEME>

              <WRF_CHARSTC1></WRF_CHARSTC1>

              <WRF_CHARSTC2></WRF_CHARSTC2>

              <WRF_CHARSTC3></WRF_CHARSTC3>
           </item>
        </PURCHORDER>
     </urn:ZPURCHASEORDER_FM>
  </soapenv:Body>
</soapenv:Envelope>
`;
  console.log("Vendor PO Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_PURCHASEORDER&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(vendorpoBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor PO data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZPURCHASEORDER_FM.Response"];
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
    }
  })

});

//-----EMPLOYEE PORTAL-------------
//EMPLOGIN
app.post('/emplogin',(req,res)=>{
  let id = req.body.id;
  let pwd = req.body.password;
  var emploginBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZEMPLOGIN_FM>
        <EMPID>${id}</EMPID>
        <PASSWORD>${pwd}</PASSWORD>
     </urn:ZEMPLOGIN_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Employee Login Call")
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_EMPAUTH&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(emploginBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Emp login data');
      res.json({ success : false, message : "Check your credentials once"});
    }else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      data = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZEMPLOGIN_FM.Response"]
      if(data["RESULT"] === 'FALSE' || data['RESULT'] === ""){
        console.log('Unable to fetch vendor login data');
        res.json({ success : false, message : "Check your credentials once"});
      }
      else{
        res.status(200).json({success : true, message : "User Authenticated Successfully", data: data});
      }

    }

  })

});

//Employee profile
app.post('/empprofile',(req,res)=>{
  let id = req.body.id;
  var empprofileBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZPIPO_FM>
        <EMPID>${id}</EMPID>
        <ID></ID>
        <PS_PDF></PS_PDF>
        <STATUS>EP</STATUS>
     </urn:ZPIPO_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Employee Profile Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_EMPLOYEE&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(empprofileBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Employee Profile data');
      res.json({ success : false, message : "No records found"});
    }
    else {
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      data = restJson['SOAP:Envelope']['SOAP:Body']["ns0:ZPIPO_FM.Response"];
      if(data.EMPDATA['PERNR'] === '00000000'){
        console.log('Unable to fetch Profile data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: data});
      }
    }



  })

});

//EMPLOYEE PAYSLIP LIST
app.post('/payslip',(req,res)=>{
  let id = req.body.id;
  var payslipBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZPIPO_FM>
        <EMPID>${id}</EMPID>
        <ID></ID>
        <PS_PDF></PS_PDF>
        <STATUS>PS</STATUS>
     </urn:ZPIPO_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Employee Payslip Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_EMPLOYEE&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(payslipBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else {
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']['ns0:ZPIPO_FM.Response']
      if(result_body.PAYSLIP_DET === ''){
        console.log('Unable to fetch data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }

    }

  })

});



//EMPLOYEE PRINT PAYSLIP
app.post('/printpayslip',(req,res)=>{
  let id = req.body.id;
  let seqence = req.body.sequence;
  var payDetailBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZEMPPAYPDF_FM>
        <EMPID>${id}</EMPID>
        <SEQUENCE_NO>${seqence}</SEQUENCE_NO>
        <PAYSLIP_HTML>
           <item>
              <LINE></LINE>
           </item>
        </PAYSLIP_HTML>
        <PAYSLIP_TAB>
           <item>
              <FORMAT_COL></FORMAT_COL>
              <TEXT_COL></TEXT_COL>
           </item>
        </PAYSLIP_TAB>
     </urn:ZEMPPAYPDF_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Employee Payslip Detail Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_PAYPDF&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(payDetailBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else {
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']['ns0:ZEMPPAYPDF_FM.Response']
      if(result_body.PAYSLIP_HTML === ''){
        console.log('Unable to fetch data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }
    }




  })

}
)

//EMPLOYEE Leave Request LIST
app.post('/leavereq',(req,res)=>{
  let id = req.body.id;
  var leavereqBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZPIPO_FM>
        <EMPID>${id}</EMPID>
        <ID></ID>
        <PS_PDF></PS_PDF>
        <STATUS>LD</STATUS>
     </urn:ZPIPO_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log("Employee Leave Request Call");
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PIPORAB&receiverParty=&receiverService=&interface=SI_EMPLOYEE&interfaceNamespace=https://arunbalaji.tech')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(leavereqBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else{
      this.res = result.body;
      let xmlParser = require('xml2json');
      rest = xmlParser.toJson(result.body);
      restJson = JSON.parse(rest);
      result_body = restJson['SOAP:Envelope']['SOAP:Body']['ns0:ZPIPO_FM.Response']
      if(result_body.IT_LEAVE_DETAIL === ''){
        console.log('Unable to fetch data');
        res.json({ success : false, message : "No records found"});
      }
      else{
        res.status(200).json({success : true, message : "Records fetched Successfully", data: result_body});
      }
    }


  })

});


//IF NOT FOUND
app.use((req, res, next) => {
  res.status(404).json({
      success: false,
      message: "Page not found"
  })
});
