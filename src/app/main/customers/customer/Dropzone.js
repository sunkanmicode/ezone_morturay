import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon, IconButton } from "@material-ui/core"
import _ from "lodash"

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#9ac876',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#0BA6CF',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function ImageDropzone(props) {
  const { name, title, icon, form, format, disabled, deleteImage, handleImageUpload } = props;
  
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: format === 'image'? 'image/jpeg, image/png' : '.pdf, .doc, image/jpeg, image/png',
    multiple: false,
    disabled: disabled,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      handleImageUpload(name, files);
    },
  });

  const files =
    _.get(form, name) && (
      <li className="flex items-center space-x-2">
        <img src={`data:image/jpg;base64,${_.get(form, name)}`} alt='' className='h-40' />
        <IconButton onClick={deleteImage(name)}><Icon>close</Icon></IconButton>
      </li>
    )

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      borderColor: !disabled ? '#eee' : '#9ac876',
    }),
    [isDragActive, isDragReject, isDragAccept, disabled]
  );

  return (
    <div className='w-full flex flex-col'>
      <section className='container'>
        <div {...getRootProps({ style })} className='space-y-2'>
          <input {...getInputProps()} />
          <Icon className='text-green'>{icon}</Icon>
          <p>
            <span className='text-green'>Click here or Drop</span> Your {_.startCase(title)}
          </p>
          <span className='text-xs text-gray-600'>{format && format.split(",").join(" and ")} format only</span>
        </div>

        <aside>
          <ul className='flex py-4 list-none' style={{listStyle: "none"}}>{files}</ul>
        </aside>
      </section>
    </div>
  );
}

export default ImageDropzone;
