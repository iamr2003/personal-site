import './Experiments.css';

export function BorderRadiusAnimation(){
    // inspired by this knowledge: https://9elements.github.io/fancy-border-radius/
    
    //I don't feel like making a css file, writing all inline
    const animation = 
    '@keyframes border-radius-animation { from { border-radius: 0px; } to { border-radius: 100px; } }';

    return (
        <div>
            {/* Border Radius CSS Animation: */}
            <div className="BorderRadiusExperiment" style={{}}>
            </div>
        </div>
    )
}

// next idea, do a custom svg graphic