import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

const ChipsArray = ({ showBase, chipData, setChipData}) => {

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            component="ul"
        >
            {showBase ? <Chip sx={{ marginRight: '10px' }} label="Сделать" /> : ''}
            {chipData.map((data) => {
                return (
                    <Chip
                        key={data.key}
                        sx={{ marginRight: '10px' }}
                        label={data.data.label}
                        onDelete={handleDelete(data)}
                    />
                );
            })}
            {showBase ? <Chip label="Выполнено" /> : ''}
        </div>

    );
}

ChipsArray.defaultProps = { showBase: false };
export default ChipsArray