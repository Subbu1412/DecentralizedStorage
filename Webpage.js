let uploadedDocuments = [];
let accessControlList = [];

function logout() {
  alert("User logged out!");
  window.location = "https://www.google.com";
}

function setAccessControl() {
  const userSelect = document.getElementById("userSelect");
  const permissionSelect = document.getElementById("permissionSelect");

  const selectedUser = userSelect.value;
  const selectedPermission = permissionSelect.value;

  // Check if the user already has access control settings
  const existingAccess = accessControlList.find(
    (access) => access.userId === selectedUser
  );

  if (existingAccess) {
    existingAccess.permission = selectedPermission;
  } else {
    accessControlList.push({
      userId: selectedUser,
      permission: selectedPermission,
    });
  }

  alert(`Access control set for ${selectedUser}: ${selectedPermission}`);
}

function uploadDocument() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    const documentName = file.name;
    uploadedDocuments.push(documentName);

    // Update the document list
    updateDocumentList();

    alert(`Document "${documentName}" uploaded!`);
  } else {
    alert("Please select a file to upload.");
  }
}

function updateDocumentList() {
  const documentList = document.getElementById("documentList");
  documentList.innerHTML = "";

  uploadedDocuments.forEach((documentName, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = documentName;

    // Add download and delete buttons
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download";
    downloadButton.onclick = () => downloadDocument(index);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteDocument(index);

    listItem.appendChild(downloadButton);
    listItem.appendChild(deleteButton);

    documentList.appendChild(listItem);
  });
}

function downloadDocument(documentName) {
  const content = "This is the real content of the file named " + documentName;

  // Create a Blob with the content
  const blob = new Blob([content], { type: "text/plain" });

  // Create a link element
  const downloadLink = document.createElement("a");

  // Create a URL for the Blob and set it as the href attribute
  downloadLink.href = URL.createObjectURL(blob);

  // Set the download attribute with the document name
  downloadLink.download = documentName;

  // Append the link to the body
  document.body.appendChild(downloadLink);

  // Simulate a click to trigger the download
  downloadLink.click();

  // Remove the link from the body
  document.body.removeChild(downloadLink);

  // Release the Blob URL
  URL.revokeObjectURL(downloadLink.href);

  alert(`Downloading document: ${documentName}`);
}

function deleteDocument(index) {
  const documentName = uploadedDocuments[index];
  const confirmDelete = confirm(
    `Are you sure you want to delete ${documentName}?`
  );

  if (confirmDelete) {
    uploadedDocuments.splice(index, 1);

    // Update the document list
    updateDocumentList();

    alert(`Document "${documentName}" deleted.`);
  }
}
