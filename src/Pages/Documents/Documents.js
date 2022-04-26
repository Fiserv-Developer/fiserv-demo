import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, } from "@mui/material";
import { Fingerprint, FormatAlignCenter, LocalAtm, Lock, LockOpen, Policy, } from "@mui/icons-material";
import moment from 'moment';

export default function Documents() {
  const documents = [
    {
      id: "83c41dbe-85ba-47b0-83cd-13388a298807",
      type: "FINANCIAL",
      title: "Financial Document Title",
      state: "OPEN",
      description: "A Financial document",
      filename: "Financial-Document.pdf",
      documentReference: "876456",
      idReference: null,
      financialReference: "123456",
      otherReference: null,
      closeDateTime: null,
      requestType: null,
      subType: "Bank Statement",
      signatureMethod: null,
      generationDateTime: "2021-08-16T14:12:43Z",
      merchantId: "123456",
      sourceReference: null,
      obsolete: "false",
      partnerCode: null,
      createdDateTime: "2019-08-24T14:15:22Z",
      modifiedDateTime: "2019-08-24T14:15:22Z",
    },
    {
      id: "181bd373-ea65-43cb-ba09-457bd6f20158",
      type: "IDENTIFICATION",
      title: "Identification Document Title",
      state: "OPEN",
      description: "An Identification document",
      filename: "Identity-Document.pdf",
      documentReference: "5698765",
      idReference: "98765345678",
      financialReference: null,
      otherReference: null,
      closeDateTime: null,
      requestType: null,
      subType: "Passport",
      signatureMethod: null,
      generationDateTime: null,
      merchantId: "123456",
      sourceReference: null,
      obsolete: "false",
      partnerCode: null,
      createdDateTime: "2019-08-24T14:15:22Z",
      modifiedDateTime: "2019-08-24T14:15:22Z",
    },
    {
      id: "e7b2b99b-5c7c-4f29-8528-12b82dbd2b80",
      type: "CONTRACT",
      title: "Contract Document Title",
      state: "OPEN",
      description: "A Contract document",
      filename: "Contract-Document.pdf",
      documentReference: "98765",
      idReference: null,
      financialReference: null,
      otherReference: null,
      closeDateTime: "2019-08-24T14:15:22Z",
      requestType: null,
      subType: "Signed Contract",
      signatureMethod: "Wet",
      generationDateTime: "2021-08-16T14:12:43Z",
      merchantId: "123456",
      sourceReference: null,
      obsolete: "false",
      partnerCode: null,
      createdDateTime: "2019-08-24T14:15:22Z",
      modifiedDateTime: "2019-08-24T14:15:22Z",
    },
    {
      id: "b35fe866-65e3-49ca-a8a4-e16c74e4f825",
      type: "OTHER",
      title: "Other Document Title",
      state: "OPEN",
      description: "An Other document",
      filename: "Other-Document.pdf",
      documentReference: "123456",
      idReference: null,
      financialReference: null,
      otherReference: "345679876",
      closeDateTime: null,
      requestType: null,
      subType: null,
      signatureMethod: null,
      generationDateTime: "2021-08-16T14:12:43Z",
      merchantId: "123456",
      sourceReference: "string",
      obsolete: "false",
      partnerCode: null,
      createdDateTime: "2019-08-24T14:15:22Z",
      modifiedDateTime: "2019-08-24T14:15:22Z",
    },
  ];

  let headCells = [];
  Object.keys(documents[0]).filter((value, index) => {
    headCells.push({
      id: value,
      numeric: false,
      disablePadding: true,
      label: value,
    });
    return value;
  });

  return (
    <div style={{paddingLeft:'20px'}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <DocumentType type={row.type} />
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <DocumentState state={row.state} />
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.filename}</TableCell>
                <TableCell>{row.documentReference}</TableCell>
                <TableCell>{row.idReference}</TableCell>
                <TableCell>{row.financialReference}</TableCell>
                <TableCell>{row.otherReference}</TableCell>
                <TableCell>{GenDate(row.closeDateTime)}</TableCell>
                <TableCell>{row.requestType}</TableCell>
                <TableCell>{row.subType}</TableCell>
                <TableCell>{row.signatureMethod}</TableCell>
                <TableCell>{GenDate(row.generationDateTime)}</TableCell>
                <TableCell>{row.merchantId}</TableCell>
                <TableCell>{row.sourceReference}</TableCell>
                <TableCell>{row.obsolete}</TableCell>
                <TableCell>{row.partnerCode}</TableCell>
                <TableCell>{GenDate(row.createdDateTime)}</TableCell>
                <TableCell>{GenDate(row.modifiedDateTime)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


const GenDate = (date) => {

  if(date === null) {
    return null;
  }
  else {
    return moment(date).format('Do MMM YY hh:mm:ss Z');
  }
}

const DocumentState = ({ state }) => {
  if (state === "OPEN") {
    return <Tooltip title={state}><LockOpen /></Tooltip>;
  } else {
    return <Tooltip title={state}><Lock /></Tooltip>;
  }
};

const DocumentType = ({ type }) => {
  if (type === "FINANCIAL") {
    return <Tooltip title={type}><LocalAtm /></Tooltip>;
  }
  if (type === "IDENTIFICATION") {
    return <Tooltip title={type}><Fingerprint /></Tooltip>;
  }
  if (type === "CONTRACT") {
    return <Tooltip title={type}><Policy /></Tooltip>;
  }
  if (type === "OTHER") {
    return <Tooltip title={type}><FormatAlignCenter /></Tooltip>;
  } else {
    return <Tooltip title={type}><Lock /></Tooltip>;
  }
};
