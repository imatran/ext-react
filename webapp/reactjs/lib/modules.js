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
    'Ext.window.Window', 'Ext.window.Toast',
    'React.widgets.NumberPaging', 'React.widgets.ClearTextField', 'React.widgets.MenuTool'
]);

export class Container extends ExtComponent {
    getComponentClass() {
        return 'Ext.container.Container';
    }
}
export class Panel extends ExtComponent {
   getComponentClass() {
        return 'Ext.panel.Panel';
    }
}
export class Tool extends ExtComponent {
    getComponentClass() {
        return 'Ext.panel.Tool';
    }
}
export class Grid extends ExtComponent {
    getComponentClass() {
        return 'Ext.grid.Panel';
    }
}
export class Tree extends ExtComponent {
    getComponentClass() {
        return 'Ext.tree.Panel';
    }
}
export class Column extends ExtComponent {
    getComponentClass() {
        return 'Ext.grid.column.Column';
    }
}
export class TreeColumn extends ExtComponent {
    getComponentClass() {
        return 'Ext.tree.Column';
    }
}
export class ActionColumn extends ExtComponent {
    getComponentClass() {
        return 'Ext.grid.column.Action';
    }
}
export class TabPanel extends ExtComponent {
    getComponentClass() {
        return 'Ext.tab.Panel';
    }
}
export class Button extends ExtComponent {
   getComponentClass() {
        return 'Ext.button.Button';
    }
}
export class SegmentedButton extends ExtComponent {
    getComponentClass() {
        return 'Ext.button.Segmented';
    }
}
export class Label extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.Label';
    }
}
export class DisplayField extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Display';
    }
}
export class NumberField extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Number';
    }
}
export class TextArea extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.TextArea';
    }
}
export class TextField extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Text';
    }
}
export class Checkbox extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Checkbox';
    }
}
export class Radio extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.Radio';
    }
}
export class Combobox extends ExtComponent {
    getComponentClass() {
        return 'Ext.form.field.ComboBox';
    }
}
export class Toolbar extends ExtComponent {
    getComponentClass() {
        return 'Ext.toolbar.Toolbar';
    }
}
export class Fill extends ExtComponent {
    getComponentClass() {
        return 'Ext.toolbar.Fill';
    }
}
export class Spacer extends ExtComponent {
    getComponentClass() {
        return 'Ext.toolbar.Spacer';
    }
}
export class Paging extends ExtComponent {
    getComponentClass() {
        return 'Ext.toolbar.Paging';
    }
}
export class Window extends ExtComponent {
    getComponentClass() {
        return 'Ext.window.Window';
    }
}
export class Toast extends ExtComponent {
    getComponentClass() {
        return 'Ext.window.Toast';
    }
}
export class NumberPaging extends ExtComponent {
    getComponentClass() {
        return 'React.widgets.NumberPaging';
    }
}
export class ClearTextField extends ExtComponent {
    getComponentClass() {
        return 'React.widgets.ClearTextField';
    }
}
export class MenuTool extends ExtComponent {
    getComponentClass() {
        return 'React.widgets.MenuTool';
    }
}
