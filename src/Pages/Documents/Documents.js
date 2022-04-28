import React, {useState, useEffect} from "react";
import {
  Tooltip,
  Box,
  Typography,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { TreeItem, TreeView } from '@mui/lab';
import {
  Fingerprint,
  FormatAlignCenter,
  ChevronRightIcon,
  LocalAtm,
  Lock,
  ExpandMoreIcon,
  LockOpen,
  Policy,
} from "@mui/icons-material";
import moment from "moment";

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

  // const [documents, setDocuments] = useState([]);
  
  // useEffect(() => {
  //   const apiKeyJson = localStorage.getItem("apiKey");
  //   const apiKey = JSON.parse(apiKeyJson);

  //   fetch('https://test.emea.api.fiservapps.com/sandbox/exp/v1/documents', {
  //     method: 'GET',
  //     headers: {
  //       'Api-Key': apiKey,
  //       'Accept': 'application/json'
  //     }
  //   }).then(results => results.json())
  //     .then(data => setDocuments(data))
  //     .catch(rejected => console.log({rejected}));
  // }, []);


  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({});

  const handleClickOpen = (e, value) => {
    setOpen(true);
    setSelectedValue(value);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div
      style={{ paddingLeft: "20px", display: "flex", justifyContent: "center" }}
    >
    
      {documents.map((row, index) => (
        <Box
          key={index}
          sx={{
            cursor:'pointer',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "20px",
          }}
          onClick={(e) => { handleClickOpen(e, row) }}
        >
          <Box
            sx={{
              width: "220px",
              height: "160px",
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "var(--accent)",
            }}
          >
            <Typography>
              <DocumentType
                type={row.type}
                sx={{ color: "var(--white)", width: "40px", height: "40px" }}
              />
            </Typography>

            <Box
              sx={{
                position: "relative",
                height: 0,
                width: 0,
                right: "-80px",
                top: "-98px",
              }}
            >
              <DocumentState
                state={row.state}
                sx={{ color: "var(--white)", width: "22px", height: "22px" }}
              />
            </Box>
          </Box>
          <Typography
            variant="subtitle2"
            component="subtitle2"
            sx={{ textAlign: "center", paddingTop: "8px" }}
          >
            {row.filename}
          </Typography>
        </Box>
      ))}

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}



const SimpleDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.selectedValue.title}</DialogTitle>

      <TreeView
      aria-label="rich object"
      // defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      // defaultExpandIcon={<ChevronRightIcon />}
      sx={{ maxHeight: 610, flexGrow: 1, maxWidth: 600, overflowY: 'auto', padding:'20px' }}
    >
     {Object.keys(selectedValue).map((value, index) => {
       return (
        <TreeItem nodeId={index} label={Object.keys(selectedValue)[index] + " : "+selectedValue[Object.keys(selectedValue)[index]]}/>
       )
     })}
    </TreeView>
     
    </Dialog>
  );
};

const genDate = (date) => {
  if (date === null) {
    return null;
  } else {
    return moment(date).format("Do MMM YY hh:mm:ss Z");
  }
};

const DocumentState = ({ state, sx }) => {
  if (state === "OPEN") {
    return (
      <Tooltip title={state}>
        <LockOpen sx={sx} />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={state}>
        <Lock sx={sx} />
      </Tooltip>
    );
  }
};

const DocumentType = ({ type, sx }) => {
  if (type === "FINANCIAL") {
    return (
      <Tooltip title={type}>
        <LocalAtm sx={sx} />
      </Tooltip>
    );
  }
  if (type === "IDENTIFICATION") {
    return (
      <Tooltip title={type}>
        <Fingerprint sx={sx} />
      </Tooltip>
    );
  }
  if (type === "CONTRACT") {
    return (
      <Tooltip title={type}>
        <Policy sx={sx} />
      </Tooltip>
    );
  }
  if (type === "OTHER") {
    return (
      <Tooltip title={type}>
        <FormatAlignCenter sx={sx} />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={type}>
        <Lock sx={sx} />
      </Tooltip>
    );
  }
};
