# 💻 Computer Architecture and Organization

## Overview
- Computer Architecture: Structure and behavior of the computer system as seen by the programmer.
- Computer Organization: How features are implemented in hardware.


##  Basic Structure 🧠
- Major components:
  - Input Unit
  - Output Unit
  - Memory Unit
  - Control Unit
  - Arithmetic Logic Unit (ALU)
- Together form the **Von Neumann architecture**.

![Architecture](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Von_Neumann_architecture.svg/420px-Von_Neumann_architecture.svg.png?20230101135648)


##  Central Processing Unit (CPU) 
- Executes instructions from programs.
- Components:
  - **Control Unit (CU)**: Directs operation of processor.
  - **ALU**: Performs arithmetic and logic operations.
  - **Registers**: Small, fast memory for temporary data.


##  Memory Hierarchy 
- Organized based on speed and size:
  1. Registers
  2. Cache (L1, L2, L3)
  3. Main Memory (RAM)
  4. Secondary Storage (HDD, SSD)

![Memory](https://upload.wikimedia.org/wikipedia/commons/f/f6/Memory_hierarchy_diagram.jpg?20110630230042)


##  Instruction Cycle 
- **Fetch** ➝ **Decode** ➝ **Execute** ➝ **Store**
- Repeats for each instruction in a program.


##  Pipelining 
- Technique to improve performance by overlapping instruction stages.
- Example: Like an assembly line in a factory.


##  I/O Organization 🔌
- Handles data exchange between CPU and peripherals.
- Modes:
  - Programmed I/O
  - Interrupt-driven I/O
  - Direct Memory Access (DMA)

##  Addressing Modes 📬
- Ways to specify operands:
  - Immediate
  - Direct
  - Indirect
  - Register
  - Indexed


## RISC vs CISC 
| Feature      | RISC                       | CISC                      |
|--------------|----------------------------|---------------------------|
| Instructions | Simple, fixed-length       | Complex, variable-length  |
| Speed        | Faster execution           | More cycles per instruction |
| Example      | ARM, MIPS                  | Intel x86, VAX            |


## Summary 💡
- Architecture is "what the computer does".
- Organization is "how it does it".