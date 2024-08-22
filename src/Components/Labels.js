import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Labels() {
    const { labels, display, updateLabel } = useContext(GlobalContext); // Fetch labels and updateLabel from context
    const [isLabelsCollapsed, setIsLabelsCollapsed] = useState(false); // State to manage the visibility of labels

    const toggleLabels = () => {
        setIsLabelsCollapsed(prev => !prev);
    };

    return (
        <React.Fragment>
            <div className="flex items-center mb-4">
                <p className="text-gray-500 font-bold mt-10 mr-2">필터</p>
                <button
                    className="p-1 rounded flex items-center align-middle mt-10"
                    onClick={toggleLabels}
                    aria-label={isLabelsCollapsed ? "Expand Labels" : "Collapse Labels"}
                >
                    {isLabelsCollapsed ? (
                        <ExpandMoreIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                        <ExpandLessIcon className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>
            <div className={`transition-max-height duration-300 overflow-hidden ${isLabelsCollapsed ? 'max-h-0' : 'max-h-full'}`}>
                {labels.map(({ label: lbl, display, checked }, idx) => (
                    <label key={idx} className="items-center mt-3 block">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => updateLabel({ label: lbl, checked: !checked })}
                            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
                        />
                        <span className="ml-2 text-gray-700 capitalize">
                            {lbl}
                        </span>
                    </label>
                ))}
            </div>
        </React.Fragment >
    );
}
