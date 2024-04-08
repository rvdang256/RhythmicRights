import React from "react";
import styled from 'styled-components';
import Navbar from "@/components/Navbar";
export default function VideoNFT() {
return (



<>
<Navbar/>
<StyledBackground>
      <StyledOverlay />
      <StyledFormContainer>
        <div className="text-center">
          <StyledTitle>File Upload!</StyledTitle>
          <StyledDescription>Lorem ipsum is placeholder text.</StyledDescription>
        </div>
        <StyledForm>
          <div>
            <StyledInputLabel htmlFor="title">Title</StyledInputLabel>
            <StyledInput id="title" type="text" placeholder="mail@gmail.com" />
          </div>
          <div>
            <StyledFileInputLabel htmlFor="file">Attach Document</StyledFileInputLabel>
            <StyledFileInputContainer>
              <StyledFileInputWrapper>
                <div>
                  <img
                    src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                    alt="freepik image"
                    style={{ height: '9rem', width: 'auto' }}
                  />
                </div>
                <StyledFileInputText>
                  Drag and drop files here <br /> or <a href="#/">select a file</a> from your computer
                </StyledFileInputText>
                <StyledFileInput type="file" id="file" />
              </StyledFileInputWrapper>
            </StyledFileInputContainer>
          </div>
          <p className="text-sm text-gray-300">
            <span>File type: doc, pdf, types of images</span>
          </p>
          <div>
            <StyledButton>Upload</StyledButton>
          </div>
        </StyledForm>
      </StyledFormContainer>
    </StyledBackground>

</>


  );

}

const StyledBackground = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d1d5db;
  padding: 12px;
  background-image: url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const StyledOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  inset: 0;
`;

const StyledFormContainer = styled.div`
  max-width: 30rem;
  padding: 2.5rem;
  background-color: #fff;
  border-radius: 1rem;
  position: relative;
  z-index: 10;
`;

const StyledTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
`;

const StyledDescription = styled.p`
  font-size: 0.875rem;
  color: #9ca3af;
`;

const StyledForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledInputLabel = styled.label`
  font-size: 0.875rem;
  font-weight: bold;
  color: #6b7280;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #6366f1;
  }
`;

const StyledFileInputLabel = styled(StyledInputLabel)`
  display: block;
`;

const StyledFileInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledFileInput = styled.input`
  display: none;
`;

const StyledFileInputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px dashed #e5e7eb;
  border-radius: 0.75rem;
  width: 100%;
  height: 15rem;
  cursor: pointer;

  &:hover {
    border-color: #6366f1;
  }
`;

const StyledFileInputText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;

const StyledButton = styled.button`
  margin-top: 1.25rem;
  background-color: #3b82f6;
  color: #fff;
  padding: 1rem;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #2563eb;
  }
`;
