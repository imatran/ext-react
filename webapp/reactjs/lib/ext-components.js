/**
 * Created by atran on 2020-03-21.
 */
import ExtComponent from "lib/ExtComponent";

Ext.require([
    'Ext.button.Button', 'Ext.button.Segmented', 'Ext.container.Container', 'Ext.form.Label',
    'Ext.form.field.Checkbox', 'Ext.form.field.ComboBox', 'Ext.form.field.Radio',
    'Ext.form.field.Display', 'Ext.form.field.Number', 'Ext.form.field.Text', 'Ext.form.field.TextArea',
    'Ext.panel.Panel', 'Ext.panel.Tool', 'Ext.grid.Panel', 'Ext.tab.Panel', 'Ext.tree.Panel',
    'Ext.grid.column.Column', 'Ext.grid.column.Action', 'Ext.tree.Column',
    'Ext.toolbar.Fill', 'Ext.toolbar.Paging', 'Ext.toolbar.Spacer', 'Ext.toolbar.Toolbar',
    'Ext.window.Window', 'Ext.window.Toast', 'Ext.chart.CartesianChart', 'Ext.chart.PolarChart',
    'React.widgets.NumberPaging', 'React.widgets.ClearTextField', 'React.widgets.MenuTool'
]);

export class ExtContainer extends ExtComponent {
    getComponentClass() {
        return 'Ext.container.Container';
    }
}
export class ExtPanel extends ExtComponent {
   getComponentClass() {
        return 'Ext.panel.Panel';
    }
}
export class ExtTool extends ExtComponent {
    getComponentClass() {
        return 'Ext.panel.Tool';
    }
}
export class ExtGridPanel extends ExtComponent {
    getComponentClass() {
        return 'Ext.grid.Panel';
    }
}
export class ExtTreePanel extends ExtComponent {
    getComponentClass() {
        return 'Ext.tree.Panel';
    }
}
export class ExtGridColumn extends ExtComponent {
    getComponentClass() {
        return 'Ext.grid.column.Column';
    }
}
export class ExtTreeColumn extends ExtComponent {
    getComponentClass() {
        return 'Ext.tree.Column';
    }
}
export class ExtActionColumn extends ExtComponent {
    getComponentClass() {
        return 'Ext.grid.column.Action';
    }
}
export class ExtTabPanel extends ExtComponent {
    getComponentClass() {
        return 'Ext.tab.Panel';
    }
}
export class ExtButton extends ExtComponent {
   getComponentClass() {
        return 'Ext.button.Button';
    }
}
export class ExtSegmentedButton extends ExtComponent {
    getComponentClass() {
        return 'Ext.button.Segmented';
    }
}
export class ExtLabel extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.Label';
    }
}
export class ExtDisplayField extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Display';
    }
}
export class ExtNumberField extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Number';
    }
}
export class ExtTextArea extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.TextArea';
    }
}
export class ExtTextField extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Text';
    }
}
export class ExtCheckBox extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Checkbox';
    }
}
export class ExtRadio extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Radio';
    }
}
export class ExtComboBox extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.ComboBox';
    }
}
export class ExtToolbar extends ExtComponent {
    getComponentClass() {
        return 'Ext.toolbar.Toolbar';
    }
}
export class ExtFill extends ExtComponent {
    getComponentClass() {
        return 'Ext.toolbar.Fill';
    }
}
export class ExtSpacer extends ExtComponent {
    getComponentClass() {
        return 'Ext.toolbar.Spacer';
    }
}
export class ExtPaging extends ExtComponent {
    getComponentClass() {
        return 'Ext.toolbar.Paging';
    }
}
export class ExtWindow extends ExtComponent {
    getComponentClass() {
        return 'Ext.window.Window';
    }
}
export class ExtToast extends ExtComponent {
    getComponentClass() {
        return 'Ext.window.Toast';
    }
}
export class ExtCartesianChart extends ExtComponent {
    getComponentClass() {
        return 'Ext.chart.CartesianChart';
    }
}
export class ExtPolarChart extends ExtComponent {
    getComponentClass() {
        return 'Ext.chart.PolarChart';
    }
}
export class ExtNumberPaging extends ExtComponent {
    getComponentClass() {
        return 'React.widgets.NumberPaging';
    }
}
export class ExtClearTextField extends ExtComponent {
    getComponentClass() {
        return 'React.widgets.ClearTextField';
    }
}
export class ExtMenuTool extends ExtComponent {
    getComponentClass() {
        return 'React.widgets.MenuTool';
    }
}
