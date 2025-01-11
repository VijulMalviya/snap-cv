import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { TbFileTypeDocx } from "react-icons/tb";
import { TbFileTypePdf } from "react-icons/tb";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { RiSparkling2Fill } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const JobApplicationForm = () => {
  const [uplaodedFile, setuplaodedFile] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setuplaodedFile(acceptedFiles);
    acceptedFiles.forEach((file) => {
      console.log("File uploaded:", file.name);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: (rejections) => {
      rejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          if (error.code === "too-many-files") {
            toast.error("You can upload only one file at a time.");
          }
          if (error.code === "file-invalid-type") {
            toast.error(
              "Unsupported file format. Please upload a PDF or DOCX file."
            );
          }
          if (error.code === "file-too-large") {
            toast.error("File size exceeds the 5MB limit.");
          }
        });
      });
    },
  });

  return (
    <>
      <Stack direction="row" justifyContent="center" sx={{ my: 5 }}>
        <Stack
          direction="column"
          justifyContent="center"
          className="formContainer content"
          sx={{
            borderRadius: 2,
            p: 2,
            width: { xs: "100%", sm: "90%", md: "60%" },
          }}
        >
          <Typography
            className="content"
            sx={{ mb: 1 }}
            fontSize="small"
            fontWeight="bold"
          >
            Upload your CV/Resume
          </Typography>
          <Box
            {...getRootProps()}
            sx={{
              p: 4,
              mb: 2,
              border: "1px solid",
              borderRadius: 1,
              textAlign: "center",
              cursor: "pointer",
              transition: "border-color 0.3s ease, background-color 0.3s ease",
            }}
            className="uploadFilesContainer"
          >
            <input {...getInputProps()} />
            <Stack alignItems="center" spacing={2}>
              <AiOutlineCloudUpload size={50} />
              <Typography className="content" fontSize="small">
                Drag & drop files here, or click to select files
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                mt={2}
              >
                <TbFileTypeDocx size={30} />
                <TbFileTypePdf size={30} />
              </Stack>
              <Typography className="content" fontSize="small">
                Supported formats: <strong>.docx</strong>, <strong>.pdf</strong>
              </Typography>
            </Stack>
          </Box>

          {uplaodedFile?.length > 0 &&
            uplaodedFile.map((file, index) => (
              <Chip
                key={index}
                color="success"
                sx={{ width: "fit-content" }}
                size="small"
                label={
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {" "}
                    <Typography fontSize="small">{file?.name}</Typography>{" "}
                    <IoMdRemoveCircleOutline
                      onClick={() => setuplaodedFile([])}
                      fontSize={16}
                      style={{ cursor: "pointer" }}
                    />{" "}
                  </Stack>
                }
              />
            ))}

          <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<HiOutlineLightBulb />}
            >
              Review Resume Suggestions
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<IoMdCheckmarkCircleOutline />}
            >
              Analyze ATS Compatibility
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            spacing={1}
            sx={{ mt: 3 }}
          >
            <RiSparkling2Fill color="#FFEB3B" fontSize={20} />
            <Typography className="content" fontSize="small">
              <strong>
                {" "}
                Want to Optimize Your Resume with AI (Job Description Based)?{" "}
              </strong>
            </Typography>
          </Stack>
          <Typography
            className="content"
            sx={{ mt: 3, mb: 1 }}
            fontSize="small"
            fontWeight="bold"
          >
           Add Job Description
          </Typography>
          <TextField
            hiddenLabel
            id="job-description"
            name="job_description"
            placeholder="Type your job description here..."
            multiline
            variant="outlined"
            fullWidth
            rows={4}
            className="custom-textfield content"
          />
          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                p: 2,
                width: "50%",
                background:
                  "linear-gradient(to right, #0A01FF 0%, #CF4EB9 100%)",
              }}
            >
              Optimize with AI &nbsp; <BsFillRocketTakeoffFill />
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default JobApplicationForm;
